<?php
defined('ABSPATH') || exit;

if (!function_exists('am_cookies_get_path')) {
  /**
   * Returns the plugin path to a specified file.
   *
   * @param string $filename The specified file.
   * @return string
   */
  function am_cookies_get_path($path = '')
  {
    $path = preg_replace('/\.[^.]*$/', '', ltrim($path, '/')) . '.php';
    return AM_COOKIES_PATH . $path;
  }
}

if (!function_exists('am_cookies_include')) {
  /**
   * Includes a file within the plugins includes folder
   *
   * @param string $filename The specified file.
   * @param mixed $arg (optional)
   * @return void
   */
  function am_cookies_include($path = '', $args = null)
  {
    $path = am_cookies_get_path('includes/' . ltrim($path, '/'));
    if (file_exists($path)) {
      $args;
      include_once $path;
    }
  }
}

/**
 * Returns an id attribute friendly string
 *
 * @param   string $str The string to convert.
 * @return  string
 */
if (!function_exists('am_idify')) {
  function am_idify($str = '')
  {
    return str_replace(['][', '[', ']'], ['-', '-', ''], strtolower($str));
  }
}

if (!function_exists('am_use_id')) {
  function am_use_id()
  {
    $str = wp_rand();
    return am_idify(md5($str));
  }
}

if (!function_exists(('am_snakeify'))) {
  /**
   * Converts slug to snake_case
   * @param string $str
   * 
   */
  function am_snakeify($str) {
    return strtolower(preg_replace("/[\-]/", "_", $str));
  }
}