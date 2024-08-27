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

      $response = [];
      $response['am_gdpr_tracking_id'] = get_option('am_gdpr_tracking_id');
      $response['am_gdpr_font_family'] = get_option('am_gdpr_font_family');
      $response['am_gdpr_color'] = get_option('am_gdpr_color');
      $response['am_gdpr_accent_color'] = get_option('am_gdpr_accent_color');
      $response['am_gdpr_background_color'] = get_option('am_gdpr_background_color');
      $response['am_gdpr_border_width'] = get_option('am_gdpr_border_width');
      $response['am_gdpr_text'] = get_option('am_gdpr_text');
      $response['am_gdpr_wp_privacy_policy_url'] = get_option('am_gdpr_wp_privacy_policy_url');

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

      if ($request->get_param('am_gdpr_tracking_id') !== null) {
        $am_gdpr_tracking_id = sanitize_text_field($request->get_param('am_gdpr_tracking_id'));
        update_option('am_gdpr_tracking_id', $am_gdpr_tracking_id);

        $response = new WP_REST_Response([
          'wp_language' => get_locale(),
          'wp_name' => get_option('blogname'),
          'wp_url' => get_option('siteurl'),
          'wp_timezone' => wp_timezone_string(),
          'php_version' => PHP_VERSION
        ]);
      }

      if ($request->get_param('am_gdpr_font_family')) {
        $am_gdpr_font_family = sanitize_text_field($request->get_param('am_gdpr_font_family'));
        update_option('am_gdpr_font_family', $am_gdpr_font_family);
      }

      if ($request->get_param('am_gdpr_color')) {
        $am_gdpr_color = sanitize_hex_color($request->get_param('am_gdpr_color'));
        update_option('am_gdpr_color', $am_gdpr_color);
      }

      if ($request->get_param('am_gdpr_accent_color')) {
        $am_gdpr_accent_color = sanitize_hex_color($request->get_param('am_gdpr_accent_color'));
        update_option('am_gdpr_accent_color', $am_gdpr_accent_color);
      }

      if ($request->get_param('am_gdpr_background_color')) {
        $am_gdpr_background_color = sanitize_hex_color($request->get_param('am_gdpr_background_color'));
        update_option('am_gdpr_background_color', $am_gdpr_background_color);
      }

      if ($request->get_param('am_gdpr_border_width')) {
        $am_gdpr_border_width = sanitize_text_field($request->get_param('am_gdpr_border_width'));
        update_option('am_gdpr_border_width', $am_gdpr_border_width);
      }

      if ($request->get_param('am_gdpr_wp_privacy_policy_url')) {
        $am_gdpr_wp_privacy_policy_url = sanitize_text_field($request->get_param('am_gdpr_wp_privacy_policy_url'));
        update_option('am_gdpr_wp_privacy_policy_url', $am_gdpr_wp_privacy_policy_url);
      }

      if ($request->get_param('am_gdpr_text')) {
        $am_gdpr_text = rest_sanitize_object($request->get_param('am_gdpr_text'));
        update_option('am_gdpr_text', $am_gdpr_text);
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