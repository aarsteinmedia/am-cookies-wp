<?php

/**
 * AM GDPR
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

if (!class_exists('AM_GDPR_WP')) {

  class AM_GDPR_WP
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
      define('AM_GDPR_PATH', plugin_dir_path(__FILE__));
      define('AM_GDPR_SLUG', plugin_basename(__DIR__));
      define('AM_GDPR_BASENAME', plugin_basename(__FILE__));
      define('AM_GDPR_VERSION', $this->version);
      define('AM_GDPR_URL', plugin_dir_url(__FILE__));

      // Include utility functions
      include_once AM_GDPR_PATH . 'includes/functions.php';

      // am_gdpr_include('updates');
      am_gdpr_include('enqueue-scripts');
      am_gdpr_include('rest-api');
      if (is_admin()) {
        am_gdpr_include('admin');
      }
      
      add_option('am_gdpr_google_id', null);
      add_option('am_gdpr_meta_id', null);
      add_option('am_gdpr_snap_id', null);
      add_option('am_gdpr_tiktok_id', null);

      add_option('am_gdpr_align', 'bottom-left');
      add_option('am_gdpr_format', 'box');
      add_option('am_gdpr_font_family', 'sans-serif');
      add_option('am_gdpr_color', '#000000');
      add_option('am_gdpr_accent_color', '#ffffff');
      add_option('am_gdpr_background_color', '#ffffff');
      add_option('am_gdpr_border_width', 2);
      add_option('am_gdpr_text', null);
      add_option('am_gdpr_wp_privacy_policy_url', 'privacy-policy');
    }
  }


  /**
   * Main function, to initialize plugin
   * @return AM_GDPR_WP
   */
  function am_gdpr()
  {
    global $am_gdpr_wp;

    if (!isset($am_gdpr_wp)) {
      $am_gdpr_wp = new AM_GDPR_WP();
      $am_gdpr_wp->initialize();
    }

    return $am_gdpr_wp;
  }

  am_gdpr();
}
