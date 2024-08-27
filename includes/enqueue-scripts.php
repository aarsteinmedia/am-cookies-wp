<?php

defined('ABSPATH') || exit;

if (!class_exists('AM_GDPR_Enqueue_Scripts')) {

  class AM_GDPR_Enqueue_Scripts
  {
    public function __construct()
    {
      add_action('wp_enqueue_scripts', [$this, 'frontend_enqueue']);
    }

    public function frontend_enqueue()
    {
      if (is_admin()) {
        return;
      }
      wp_enqueue_script(
        'am-gdpr',
        AM_GDPR_URL . '/scripts/am-gdpr.min.js',
        null,
        '1.0.0'
      );
    }
  }
}

/**
 * Main function, to initialize class
 * @return AM_GDPR_Enqueue_Scripts
 */
(function () {
  global $am_gdpr_enqueue_scripts;

  if (!isset($am_gdpr_enqueue_scripts)) {
    $am_gdpr_enqueue_scripts = new AM_GDPR_Enqueue_Scripts();
  }

  return $am_gdpr_enqueue_scripts;
})();