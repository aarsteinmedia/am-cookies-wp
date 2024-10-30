<?php
namespace AAMD_Cookies\Utils;

defined( 'ABSPATH' ) || exit;

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
 * Generate unique id
 */
function use_id() {
	$str = wp_rand();
	return aamd_idify( \md5( $str ) );
}

/**
 * Converts slug to snake_case
 *
 * @param string $str
 */
function snakeify( $str ) {
	return \strtolower( \preg_replace( '/[\-]/', '_', $str ) );
}
