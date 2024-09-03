<?php

/**
 * AM Cookies for WordPress
 * 
 * @package AM Cookies
 * @author Aarstein Media
 *
 * @wordpress-plugin
 * Plugin Name:       AM Cookies
 * Description:       Simple and versatile GDPR compatible Cookie Compliance Plugin for WordPress.
 * Requires at least: 5.9
 * Requires PHP:      7.0
 * Version:           1.0.0
 * Author:            Aarstein Media
 * Author URI:        https://www.aarstein.media
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       am-cookies
 */

defined('ABSPATH') || exit;

if (!class_exists('AM_Cookies')) {

  class AM_Cookies
  {
    public $version;

    /**
     * Constructor.
     *
     * @param   void
     * @return  void
     */
    public function __construct()
    {
      $this->version = '1.0.0';
    }

    /**
     * Sets up AM GDPR plugin
     * @return void
     */
    public function initialize()
    {

      // Define constants
      define('AM_COOKIES_PATH', plugin_dir_path(__FILE__));
      define('AM_COOKIES_SLUG', plugin_basename(__DIR__));
      define('AM_COOKIES_BASENAME', plugin_basename(__FILE__));
      define('AM_COOKIES_VERSION', $this->version);
      define('AM_COOKIES_URL', plugin_dir_url(__FILE__));

      // Include utility functions
      include_once AM_COOKIES_PATH . 'includes/functions.php';

      // am_cookies_include('updates');
      am_cookies_include('enqueue-scripts');
      am_cookies_include('rest-api');
      if (is_admin()) {
        am_cookies_include('admin');
      }
      
      add_option('am_cookies_google_id', null);
      add_option('am_cookies_meta_id', null);
      add_option('am_cookies_snap_id', null);
      add_option('am_cookies_tiktok_id', null);

      add_option('am_cookies_align', 'bottom-left');
      add_option('am_cookies_format', 'box');
      add_option('am_cookies_font_family', 'sans-serif');
      add_option('am_cookies_color', '#000000');
      add_option('am_cookies_accent_color', '#ffffff');
      add_option('am_cookies_background_color', '#ffffff');
      add_option('am_cookies_border_width', 2);
      add_option('am_cookies_text', null);
      add_option('am_cookies_wp_privacy_policy_url', 'privacy-policy');
    }
  }


  /**
   * Main function, to initialize plugin
   * @return AM_Cookies
   */
  function am_cookies()
  {
    global $am_cookies;

    if (!isset($am_cookies)) {
      $am_cookies = new AM_Cookies();
      $am_cookies->initialize();
    }

    return $am_cookies;
  }

  am_cookies();
}
