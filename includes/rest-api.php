<?php
namespace AAMD_Cookies;

use function AAMD_Cookies\Utils\get_options;

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
			foreach ( \array_keys( get_options() ) as $option ) {
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

			foreach ( get_options() as $option => [$_, $sanitizer] ) {
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
