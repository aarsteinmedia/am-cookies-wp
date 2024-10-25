<?php
defined( 'ABSPATH' ) || exit;

/**
 * Returns the plugin path to a specified file.
 *
 * @param string $filename The specified file.
 * @return string
 */
function aamd_cookies_get_path( $path = '' ) {
	$path = preg_replace( '/\.[^.]*$/', '', ltrim( $path, '/' ) ) . '.php';
	return AAMD_COOKIES_PATH . $path;
}

/**
 * Includes a file within the plugins includes folder
 *
 * @param string $filename The specified file.
 * @param mixed  $arg (optional)
 * @return void
 */
function aamd_cookies_include( $path = '', $args = null ) {
	$path = aamd_cookies_get_path( 'includes/' . ltrim( $path, '/' ) );
	if ( file_exists( $path ) ) {
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
function aamd_idify( $str = '' ) {
	return str_replace( array( '][', '[', ']' ), array( '-', '-', '' ), strtolower( $str ) );
}

function aamd_use_id() {
	$str = wp_rand();
	return aamd_idify( md5( $str ) );
}

/**
 * Converts slug to snake_case
 *
 * @param string $str
 */
function aamd_snakeify( $str ) {
	return strtolower( preg_replace( '/[\-]/', '_', $str ) );
}
