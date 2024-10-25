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
 * Version:           1.1.0
 * Author:            Aarstein Media
 * Author URI:        https://www.aarstein.media
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       am-cookies
 */

defined( 'ABSPATH' ) || exit;

if ( ! class_exists( 'AAMD_Cookies' ) ) {
	class AAMD_Cookies {

		public $version;

		/**
		 * Constructor.
		 *
		 * @param   void
		 * @return  void
		 */
		public function __construct() {
			$this->version = '1.1.0';
		}

		/**
		 * Sets up AM GDPR plugin
		 *
		 * @return void
		 */
		public function initialize() {

			// Define constants
			define( 'AAMD_COOKIES_PATH', plugin_dir_path( __FILE__ ) );
			define( 'AAMD_COOKIES_SLUG', plugin_basename( __DIR__ ) );
			define( 'AAMD_COOKIES_BASENAME', plugin_basename( __FILE__ ) );
			define( 'AAMD_COOKIES_VERSION', $this->version );
			define( 'AAMD_COOKIES_URL', plugin_dir_url( __FILE__ ) );

			// Include utility functions
			include_once AAMD_COOKIES_PATH . 'includes/utils.php';

			aamd_cookies_include( 'frontend' );
			aamd_cookies_include( 'rest-api' );
			if ( is_admin() ) {
				aamd_cookies_include( 'admin' );
			}

			add_option( 'aamd_cookies_google_id', null );
			add_option( 'aamd_cookies_meta_id', null );
			add_option( 'aamd_cookies_snap_id', null );
			add_option( 'aamd_cookies_tiktok_id', null );

			add_option( 'aamd_cookies_align', 'bottom-left' );
			add_option( 'aamd_cookies_align_mini', 'bottom-left' );
			add_option( 'aamd_cookies_format', 'box' );
			add_option( 'aamd_cookies_font_family', 'sans-serif' );
			add_option( 'aamd_cookies_color', '#000000' );
			add_option( 'aamd_cookies_accent_color', '#ffffff' );
			add_option( 'aamd_cookies_background_color', '#ffffff' );
			add_option( 'aamd_cookies_border_width', 2 );
			add_option( 'aamd_cookies_text', null );
			add_option( 'aamd_cookies_wp_privacy_policy_url', 'privacy-policy' );
		}
	}
}


/**
 * Main function, to initialize plugin
 *
 * @return AAMD_Cookies
 */
( function () {
	global $aamd_cookies;

	if ( ! isset( $aamd_cookies ) ) {
		$aamd_cookies = new AAMD_Cookies();
		$aamd_cookies->initialize();
	}

	return $aamd_cookies;
} )();
