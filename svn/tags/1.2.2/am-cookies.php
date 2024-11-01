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
 * Version:           1.2.2
 * Author:            Aarstein Media
 * Author URI:        https://www.aarstein.media
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       am-cookies
 */

defined( 'ABSPATH' ) || exit;

use function AAMD_Cookies\Utils\include_file;
use function AAMD_Cookies\Utils\get_options;

if ( ! class_exists( 'AAMD_Cookies' ) ) {
	class AAMD_Cookies {

		/**
		 * Constructor.
		 *
		 * @param   void
		 * @return  void
		 */
		public function __construct() {

			// Define constants
			/** Path to plugin directory */
			define( 'AAMD_COOKIES_PATH', plugin_dir_path( __FILE__ ) );
			define( 'AAMD_COOKIES_SLUG', plugin_basename( __DIR__ ) );
			define( 'AAMD_COOKIES_BASENAME', plugin_basename( __FILE__ ) );
			define( 'AAMD_COOKIES_URL', plugin_dir_url( __FILE__ ) );
			/** Path to plugin main file */
			define( 'AAMD_COOKIES_FILE', AAMD_COOKIES_PATH . AAMD_COOKIES_SLUG . '.php' );

			// Include utility functions
			include_once AAMD_COOKIES_PATH . 'includes/utils.php';

			include_file( 'frontend' );
			include_file( 'rest-api' );

			if ( is_admin() ) {
				include_file( 'admin' );
			}

			foreach ( get_options() as $option => [$default_value] ) {
				add_option( $option, $default_value );
			}
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
	}

	return $aamd_cookies;
} )();
