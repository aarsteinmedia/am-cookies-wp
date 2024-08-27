<?php

defined('ABSPATH') || exit;

if (!class_exists('AM_GDPR_Rest_API')) {
  class AM_GDPR_Rest_API
  {
    /**
     * Constructor
     *
     * @param void
     * @return void
     */
    public function __construct()
    {
      add_action('rest_api_init', [$this, 'register_options_rest_route']);
    }

    /**
     * Register Rest API Route for options page
     */
    public function register_options_rest_route()
    {
      register_rest_route(
        'am-gdpr-wp-settings/v1',
        '/options',
        [
          'methods' => 'GET',
          'callback' => [$this, 'options_read_rest_route_callback'],
          'permission_callback' => '__return_true'
        ]
      );

      register_rest_route(
        'am-gdpr-wp-settings/v1',
        '/options',
        [
          'methods' => 'POST',
          'callback' => [$this, 'options_write_rest_route_callback'],
          'permission_callback' => '__return_true'
        ]
      );
    }

    /**
     * Callback function to read from Rest API
     */
    public function options_read_rest_route_callback($data)
    {
      if (!current_user_can('manage_options')) {
        return new WP_Error(
          'rest_read_error',
          __('Not allowed', 'am-gdpr-wp'),
          ['status' => 403]
        );
      }

      // TODO:
      $response = [];
      // $response['am_lottieplayer_pro_license'] = get_option('am_lottieplayer_pro_license');
      // $response['am_lottieplayer_pro_license_activated'] = get_option('am_lottieplayer_pro_license_activated');
      // $response['am_lottieplayer_pro_load_light'] = get_option('am_lottieplayer_pro_load_light');

      $response = new WP_REST_Response($response);

      return $response;
    }

    /**
     * Callback function to write to Rest API
     */
    public function options_write_rest_route_callback($request)
    {
      if (!current_user_can('manage_options')) {
        return new WP_Error(
          'rest_write_error',
          __('Not allowed', 'am-gdpr'),
          ['status' => 403]
        );
      }

      $response = new WP_REST_Response([
        'success' => true
      ]);

      if ($request->get_param('am_lottieplayer_pro_load_light') !== null) {
        $am_lottieplayer_pro_load_light = rest_sanitize_boolean($request->get_param('am_lottieplayer_pro_load_light'));
        update_option('am_lottieplayer_pro_load_light', $am_lottieplayer_pro_load_light);
      }

      if ($request->get_param('am_lottieplayer_pro_license')) {
        $am_lottieplayer_pro_license = sanitize_text_field($request->get_param('am_lottieplayer_pro_license'));
        update_option('am_lottieplayer_pro_license', $am_lottieplayer_pro_license);

        $response = new WP_REST_Response([
          'wp_language' => get_locale(),
          'wp_name' => get_option('blogname'),
          'wp_url' => get_option('siteurl'),
          'wp_timezone' => wp_timezone_string(),
          'php_version' => PHP_VERSION
        ]);
      }
      if ($request->get_param('am_lottieplayer_pro_license_activated') !== null) {
        $am_lottieplayer_pro_license_activated = rest_sanitize_boolean($request->get_param('am_lottieplayer_pro_license_activated'));
        update_option('am_lottieplayer_pro_license_activated', $am_lottieplayer_pro_license_activated);
      }

      return $response;
    }
  }
}

/**
 * Main function, to initialize class
 * @return AM_GDPR_Rest_API
 */
(function () {
  global $am_gdpr_rest_api;

  if (!isset($am_gdpr_rest_api)) {
    $am_gdpr_rest_api = new AM_GDPR_Rest_API();
  }

  return $am_gdpr_rest_api;
})();