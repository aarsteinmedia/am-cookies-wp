<?php
namespace AAMD_Cookies;

defined( 'ABSPATH' ) || exit;

class Rest_API {

	/**
	 * Constructor
	 *
	 * @param void
	 * @return void
	 */
	public function __construct() {
		add_action(
			'rest_api_init',
			array( $this, 'register_options_rest_route' )
		);
	}

	/**
	 * Register Rest API Route for options page
	 */
	public function register_options_rest_route() {
		register_rest_route(
			'am-cookies-settings/v1',
			'/options',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'options_read_rest_route_callback' ),
				'permission_callback' => '__return_true',
			)
		);

		register_rest_route(
			'am-cookies-settings/v1',
			'/options',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'options_write_rest_route_callback' ),
				'permission_callback' => '__return_true',
			)
		);
	}

	/**
	 * Array with all options, with accociated
	 * methods for sanitizing
	 */
	private const _options = array(
		// Tracking
		'aamd_cookies_google_id'             => 'sanitize_text_field',
		'aamd_cookies_meta_id'               => 'sanitize_text_field',
		'aamd_cookies_snap_id'               => 'sanitize_text_field',
		'aamd_cookies_tiktok_id'             => 'sanitize_text_field',

		// Layout
		'aamd_cookies_align'                 => 'sanitize_text_field',
		'aamd_cookies_align_mini'            => 'sanitize_text_field',
		'aamd_cookies_format'                => 'sanitize_text_field',
		'aamd_cookies_font_family'           => 'sanitize_text_field',
		'aamd_cookies_color'                 => 'sanitize_hex_color',
		'aamd_cookies_accent_color'          => 'sanitize_hex_color',
		'aamd_cookies_background_color'      => 'sanitize_hex_color',
		'aamd_cookies_border_width'          => 'sanitize_text_field',
		'aamd_cookies_text'                  => 'rest_sanitize_object',

		// Privacy policy
		'aamd_cookies_wp_privacy_policy_url' => 'sanitize_text_field',
	);

	/**
	 * Callback function to read from Rest API
	 */
	public function options_read_rest_route_callback( $data ) {
		try {
			if ( ! current_user_can( 'manage_options' ) ) {
				throw new \WP_Error(
					'rest_read_error',
					__( 'Not allowed', 'am-cookies' ),
					array( 'status' => 403 )
				);
			}

			$response = array();

			// Loop over options keys to get options
			foreach ( \array_keys( self::_options ) as $option ) {
				if ( ! get_option( $option ) ) {
					continue;
				}
				$response[ $option ] = get_option( $option );
			}

			$response = new \WP_REST_Response( $response );

			return $response;
		} catch ( \Exception $e ) {
			return $e;
		}
	}

	/**
	 * Callback function to write to Rest API
	 */
	public function options_write_rest_route_callback( $request ) {
		try {

			if ( ! current_user_can( 'manage_options' ) ) {
				throw new \WP_Error(
					'rest_write_error',
					__( 'Not allowed', 'am-cookies' ),
					array( 'status' => 403 )
				);
			}

			$response = new \WP_REST_Response(
				array(
					'success' => true,
				)
			);

			foreach ( self::_options as $option => $sanitizer ) {
				if ( ! $request->get_param( $option ) || ! function_exists( $sanitizer ) ) {
					continue;
				}
				update_option(
					$option,
					$sanitizer( $request->get_param( $option ) )
				);
			}

			return $response;
		} catch ( \Exception $e ) {
			return $e;
		}
	}
}

/**
 * Main function, to initialize class
 *
 * @return Rest_API
 */
( function () {
	global $aamd_cookies_rest_api;

	if ( ! isset( $aamd_cookies_rest_api ) ) {
		$aamd_cookies_rest_api = new Rest_API();
	}

	return $aamd_cookies_rest_api;
} )();
