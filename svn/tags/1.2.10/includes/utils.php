<?php
namespace AAMD_Cookies\Utils;

defined( 'ABSPATH' ) || exit;

/**
 * Array with all options, with array of
 * default value and accociated methods for sanitizing
 */
function get_options() {
	return array(
		// Tracking
		'aamd_cookies_google_id'             => array( null, 'sanitize_text_field' ),
		'aamd_cookies_meta_id'               => array( null, 'sanitize_text_field' ),
		'aamd_cookies_snap_id'               => array( null, 'sanitize_text_field' ),
		'aamd_cookies_tiktok_id'             => array( null, 'sanitize_text_field' ),

		// Layout
		'aamd_cookies_align'                 => array( 'bottom-left', 'sanitize_text_field' ),
		'aamd_cookies_align_mini'            => array( 'bottom-left', 'sanitize_text_field' ),
		'aamd_cookies_format'                => array( 'box', 'sanitize_text_field' ),
		'aamd_cookies_font_family'           => array( 'sans-serif', 'sanitize_text_field' ),
		'aamd_cookies_color'                 => array( '#000000', 'sanitize_hex_color' ),
		'aamd_cookies_accent_color'          => array( '#ffffff', 'sanitize_hex_color' ),
		'aamd_cookies_background_color'      => array( '#ffffff', 'sanitize_hex_color' ),
		'aamd_cookies_border_width'          => array( 2, 'sanitize_text_field' ),
		'aamd_cookies_text'                  => array( null, 'rest_sanitize_object' ),

		// Privacy policy
		'aamd_cookies_wp_privacy_policy_url' => array( 'privacy-policy', 'sanitize_text_field' ),
	);
}

/**
 * Returns the plugin path to a specified file.
 *
 * @param string $filename The specified file.
 * @return string
 */
function get_path( $path = '' ) {
	$path = \preg_replace( '/\.[^.]*$/', '', \ltrim( $path, '/' ) ) . '.php';
	return AAMD_COOKIES_PATH . $path;
}

/**
 * Includes a file within the plugins includes folder
 *
 * @param string $filename The specified file.
 * @param mixed  $arg (optional)
 * @return void
 */
function include_file( $path = '', $args = null ) {
	$path = get_path( 'includes/' . \ltrim( $path, '/' ) );
	if ( \file_exists( $path ) ) {
		$args;
		include_once $path;
	}
}

/**
 * Returns an id attribute friendly string
 *
 * @param   string $str The string to convert.
 * @return  string
 */
function idify( $str = '' ) {
	return \str_replace( array( '][', '[', ']' ), array( '-', '-', '' ), \strtolower( $str ) );
}

/**
 * Converts slug to snake_case
 *
 * @param string $str
 */
function snakeify( $str ) {
	return \strtolower( \preg_replace( '/[\-]/', '_', $str ) );
}

/**
 * Generate unique id
 */
function use_id() {
	$str = wp_rand();
	return aamd_idify( \md5( $str ) );
}
