<?php

defined( 'ABSPATH' ) || exit;

if ( ! class_exists( 'AAMD_COOKIES_Rest_API' ) ) {
	class AAMD_COOKIES_Rest_API {

		/**
		 * Constructor
		 *
		 * @param void
		 * @return void
		 */
		public function __construct() {
			add_action( 'rest_api_init', array( $this, 'register_options_rest_route' ) );
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
			if ( ! current_user_can( 'manage_options' ) ) {
				return new WP_Error(
					'rest_read_error',
					__( 'Not allowed', 'am-cookies' ),
					array( 'status' => 403 )
				);
			}

			$response = array();
			// Tracking
			$response['aamd_cookies_google_id'] = get_option( 'aamd_cookies_google_id' );
			$response['aamd_cookies_meta_id']   = get_option( 'aamd_cookies_meta_id' );
			$response['aamd_cookies_snap_id']   = get_option( 'aamd_cookies_snap_id' );
			$response['aamd_cookies_tiktok_id'] = get_option( 'aamd_cookies_tiktok_id' );

			// Layout
			$response['aamd_cookies_align']            = get_option( 'aamd_cookies_align' );
			$response['aamd_cookies_align_mini']       = get_option( 'aamd_cookies_align_mini' );
			$response['aamd_cookies_format']           = get_option( 'aamd_cookies_format' );
			$response['aamd_cookies_font_family']      = get_option( 'aamd_cookies_font_family' );
			$response['aamd_cookies_color']            = get_option( 'aamd_cookies_color' );
			$response['aamd_cookies_accent_color']     = get_option( 'aamd_cookies_accent_color' );
			$response['aamd_cookies_background_color'] = get_option( 'aamd_cookies_background_color' );
			$response['aamd_cookies_border_width']     = get_option( 'aamd_cookies_border_width' );
			$response['aamd_cookies_text']             = get_option( 'aamd_cookies_text' );

			// Privacy policy
			$response['aamd_cookies_wp_privacy_policy_url'] = get_option( 'aamd_cookies_wp_privacy_policy_url' );

			$response = new WP_REST_Response( $response );

			return $response;
		}

		/**
		 * Callback function to write to Rest API
		 */
		public function options_write_rest_route_callback( $request ) {
			if ( ! current_user_can( 'manage_options' ) ) {
				return new WP_Error(
					'rest_write_error',
					__( 'Not allowed', 'am-cookies' ),
					array( 'status' => 403 )
				);
			}

			$response = new WP_REST_Response(
				array(
					'success' => true,
				)
			);

			if ( $request->get_param( 'aamd_cookies_google_id' ) !== null ) {
				update_option( 'aamd_cookies_google_id', sanitize_text_field( $request->get_param( 'aamd_cookies_google_id' ) ) );
			}

			if ( $request->get_param( 'aamd_cookies_meta_id' ) !== null ) {
				update_option( 'aamd_cookies_meta_id', sanitize_text_field( $request->get_param( 'aamd_cookies_meta_id' ) ) );
			}

			if ( $request->get_param( 'aamd_cookies_snap_id' ) !== null ) {
				update_option( 'aamd_cookies_snap_id', sanitize_text_field( $request->get_param( 'aamd_cookies_snap_id' ) ) );
			}

			if ( $request->get_param( 'aamd_cookies_tiktok_id' ) !== null ) {
				update_option( 'aamd_cookies_tiktok_id', sanitize_text_field( $request->get_param( 'aamd_cookies_tiktok_id' ) ) );
			}

			if ( $request->get_param( 'aamd_cookies_align' ) ) {
				update_option( 'aamd_cookies_align', sanitize_text_field( $request->get_param( 'aamd_cookies_align' ) ) );
			}

			if ( $request->get_param( 'aamd_cookies_align_mini' ) ) {
				update_option( 'aamd_cookies_align_mini', sanitize_text_field( $request->get_param( 'aamd_cookies_align_mini' ) ) );
			}

			if ( $request->get_param( 'aamd_cookies_format' ) ) {
				update_option( 'aamd_cookies_format', sanitize_text_field( $request->get_param( 'aamd_cookies_format' ) ) );
			}

			if ( $request->get_param( 'aamd_cookies_font_family' ) ) {
				update_option( 'aamd_cookies_font_family', sanitize_text_field( $request->get_param( 'aamd_cookies_font_family' ) ) );
			}

			if ( $request->get_param( 'aamd_cookies_color' ) ) {
				update_option( 'aamd_cookies_color', sanitize_hex_color( $request->get_param( 'aamd_cookies_color' ) ) );
			}

			if ( $request->get_param( 'aamd_cookies_accent_color' ) ) {
				update_option( 'aamd_cookies_accent_color', sanitize_hex_color( $request->get_param( 'aamd_cookies_accent_color' ) ) );
			}

			if ( $request->get_param( 'aamd_cookies_background_color' ) ) {
				update_option( 'aamd_cookies_background_color', sanitize_hex_color( $request->get_param( 'aamd_cookies_background_color' ) ) );
			}

			if ( $request->get_param( 'aamd_cookies_border_width' ) ) {
				update_option( 'aamd_cookies_border_width', sanitize_text_field( $request->get_param( 'aamd_cookies_border_width' ) ) );
			}

			if ( $request->get_param( 'aamd_cookies_wp_privacy_policy_url' ) ) {
				update_option( 'aamd_cookies_wp_privacy_policy_url', sanitize_text_field( $request->get_param( 'aamd_cookies_wp_privacy_policy_url' ) ) );
			}

			if ( $request->get_param( 'aamd_cookies_text' ) ) {
				update_option( 'aamd_cookies_text', rest_sanitize_object( $request->get_param( 'aamd_cookies_text' ) ) );
			}

			return $response;
		}
	}
}

/**
 * Main function, to initialize class
 *
 * @return AAMD_COOKIES_Rest_API
 */
( function () {
	global $aamd_cookies_rest_api;

	if ( ! isset( $aamd_cookies_rest_api ) ) {
		$aamd_cookies_rest_api = new AAMD_COOKIES_Rest_API();
	}

	return $aamd_cookies_rest_api;
} )();
