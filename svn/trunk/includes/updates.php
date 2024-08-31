<?php

defined('ABSPATH') || exit;

if (!class_exists('AM_GDPR_Updates')) {
  class AM_GDPR_Updates
  {

    public $cacheAllowed;
    public $cacheKey;

    /**
     * @var int
     * Number of plugin update checks
     */
    var $checked = 0;

    /**
     *
     * @param   void
     * @return  void
     */
    public function __construct()
    {
      $this->cacheKey = am_snakeify(AM_GDPR_SLUG) . '_updates';
      $this->cacheAllowed = false;

      // Hook into updates
      add_action('upgrader_process_complete', [$this, 'purgeTransient'], 10, 2);
      add_action('in_plugin_update_message-' . AM_GDPR_BASENAME, [$this, 'addUpdateMessage'], 10, 2);

      // append update information to transient
			add_filter('pre_set_site_transient_update_plugins', [$this, 'modifyPluginsTransient'], 10, 1);
      add_filter('plugins_api', [$this, 'getPluginInfo'], 20, 3);
    }

    /**
     * Get info about plugin from API
     * @param array|object $result The result object or array. Default false.
     * @param string $action API action to perform: 'query_plugins', 'plugin_information', 'hot_tags' or 'hot_categories'
     * @param array|object $args Array or object of arguments to serialize for the Plugin Info API.
     * 
     * @return object Plugin Data
     */
    function getPluginInfo($result, $action = null, $args = null)
    {
      $slug = (string) AM_GDPR_SLUG;
      $transient_name = am_snakeify($slug) . '_info';

      if ($action !== 'plugin_information' || $slug !== $args->slug) {
        return $result;
      }

      // Check cache
      $transient = get_transient($transient_name);
      if (!!$transient) {
        return $transient;
      }

      $response = $this->request("v1/plugins/$slug");

      if (!is_array($response)) {
        return $result;
      }

      // Remove tags & versions (different context)
      unset($response['tags']);

      // convert to object
      $response = (object) $response;

      // sections
      $sections = [
        'description'    => '',
        'installation'   => '',
        'changelog'      => '',
        'faq'            => '',
      ];
      foreach ($sections as $key => $value) {
        $sections[$key] = $response->$key;
      }

      $response->sections = $sections;

      $expiration = $this->getExpiration($response, DAY_IN_SECONDS, MONTH_IN_SECONDS);
      set_transient($transient_name, $response, $expiration);

      return $response;
    }

    /**
     *  This function safely gets the expiration value from a response.
     *
     *  @param   mixed $response The response from the server. Default false.
     *  @param   int   $min The minimum expiration limit. Default 0.
     *  @param   int   $max The maximum expiration limit. Default 0.
     *  @return  int
     */
    public function getExpiration($response = false, $min = 0, $max = 0)
    {
      $expiration = 0;

      // check possible error conditions.
      if (is_wp_error($response) || is_string($response)) {
        return 5 * MINUTE_IN_SECONDS;
      }

      // use the server requested expiration if present.
      if (is_array($response) && isset($response['expiration'])) {
        $expiration = (int) $response['expiration'];
      }

      // use the minimum if neither check matches, or ensure the server expiration isn't lower than our minimum.
      if ($expiration < $min) {
        return $min;
      }

      // ensure the server expiration isn't higher than our max.
      if ($expiration > $max) {
        return $max;
      }

      return $expiration;
    }

    /**
     * Add information button to plugin meta
     * @param array $links
     * @param string $name Name of current plugin
     */
    function addMetaLinks($links, $name, $data, $stat)
    {
      if ($name === AM_GDPR_BASENAME) {
        $links[] = sprintf(
          '<a href="%s" class="thickbox open-plugin-details-modal" data-title="%s">%s</a>',
          add_query_arg(
            [
              'tab' => 'plugin-information',
              'plugin' => AM_GDPR_SLUG,
              'TB_iframe' => true,
              'width' => 772,
              'height' => 788
            ],
            admin_url('plugin-install.php')
          ),
          'AM GDPR PRO',
          __('View details')
        );
      };
      return $links;
    }

    /**
     * Purge transient cache
     * @return void
     */
    public function purgeTransient($upgrader, $options)
    {
      if (
        $this->cacheAllowed &&
        'update' === $options['action'] &&
        'plugin' === $options['type']
      ) {
        delete_transient($this->cacheKey);
      }
    }

    /**
     * Connect to remote API to get retrieve Plugin Data
     * @param string endpoint
     * @return array|string|WP_Error The result from local cache or remote API
     */
    public function request($endpoint = '', $body = null)
    {
      $url = "https://api.aarstein.media/$endpoint";
      $response = get_transient($this->cacheKey);
      
      if (!$response || !$this->cacheAllowed) {

        if (!!$body) {
          // error_log(print_r($body, true));
          $response = wp_remote_post(
            $url,
            [
              'timeout' => 10,
              'body' => $body,
              'headers' => [
                'Content-Type' => 'application/json'
              ]
            ]
          );
        } else {
          $response = wp_remote_get(
            $url,
            [
              'timeout' => 10,
            ]
          );
        }

        if (is_wp_error(($response))) {
          return $response;
        }

        if (wp_remote_retrieve_response_code($response) !== 200) {
          return new WP_Error('server_error', wp_remote_retrieve_response_message($response));
        }

        set_transient($this->cacheKey, $response, DAY_IN_SECONDS);
      }

      $json = json_decode(wp_remote_retrieve_body($response), true);

      if ($json === null) {
        return wp_remote_retrieve_body($response);
      }

      return $json;
    }

    /**
     * Check if there is a new version, and it's compatible med
     * current WP version and PHP version
     */
    function checkVersions($data) {
      return version_compare(AM_GDPR_VERSION, $data->version, '<') &&
        version_compare($data->requires, get_bloginfo('version'), '<=') &&
        version_compare($data->requires_php, PHP_VERSION, '<');
    }

    public function modifyPluginsTransient($transient)
    {
      // bail early if no response (error)
			if (!isset($transient->response)) {
				return $transient;
			}

      $forceCheck = ($this->checked === 0) ? !empty($_GET['force-check']) : false;
      $updates = $this->getUpdates($forceCheck);

      if ($this->checkVersions($updates) && is_object($updates)) {
        $transient->response[AM_GDPR_BASENAME] = $updates;
        $transient->response[AM_GDPR_BASENAME]->new_version = $updates->version;
        if (isset($updates->download_url)) {
          $transient->response[AM_GDPR_BASENAME]->package = $updates->download_url;
        }
      }

      $this->checked++;

      return $transient;
    }

    /**
     * Check update is available
     * @return object Modified Plugin Data
     */
    public function getUpdates($forceCheck = false, $license = null)
    {
      $slug = AM_GDPR_SLUG;

      $checked = [
        AM_GDPR_BASENAME => AM_GDPR_VERSION,
      ];

      if (!$forceCheck) {
        $transient = get_transient($this->cacheKey);

        if (is_array($transient)) {
          $transientChecked = isset($transient['checked']) ? $transient['checked'] : [];
          if (wp_json_encode($checked) !== wp_json_encode($transientChecked)) {
            $transient = false;
          }
        }
        if ($transient !== false) {
          add_filter('plugin_row_meta', [$this, 'addMetaLinks'], 25, 4);
          return $transient;
        }
      }

      $post = wp_json_encode([
        'key' => $license,
        'wp_url' => get_option('siteurl'),
        'wp_version' => get_bloginfo('version'),
        'php_version' => PHP_VERSION,
      ]);

      $response = $this->request("v1/plugins/$slug/update", $post);

      if (is_wp_error($response) || !is_array($response)) {
        add_filter('plugin_row_meta', [$this, 'addMetaLinks'], 25, 4);
        return $transient;
      }

      // convert array to object
      $response = (object) $response;

      $response->checked = $checked;

      $expiration = $this->getExpiration($response, DAY_IN_SECONDS, MONTH_IN_SECONDS);

      set_transient($this->cacheKey, $response, $expiration);

      if (!$this->checkVersions($response)) {
        add_filter('plugin_row_meta', [$this, 'addMetaLinks'], 25, 4);
      }

      return $response;
    }

  }
}

/**
 * Main function, to initialize class
 * @return AM_GDPR_Updates
 */
(function () {
  global $am_gdpr_updates;

  if (!isset($am_gdpr_updates)) {
    $am_gdpr_updates = new AM_GDPR_Updates();
  }

  return $am_gdpr_updates;
})();
