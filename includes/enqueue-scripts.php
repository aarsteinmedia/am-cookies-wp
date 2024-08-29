<?php

defined('ABSPATH') || exit;

if (!class_exists('AM_GDPR_Enqueue_Scripts')) {

  class AM_GDPR_Enqueue_Scripts
  {
    public function __construct()
    {
      add_action('wp_enqueue_scripts', [$this, 'init']);
    }

    public function init()
    {
      if (is_admin()) {
        return;
      }
      wp_enqueue_script(
        'am-gdpr',
        AM_GDPR_URL . '/scripts/am-gdpr.min.js',
        [],
        '1.0.0'
      );

      add_action('wp_body_open', 'add_gdpr_web_component');
      function add_gdpr_web_component()
      { ?>
      <am-gdpr
        googleID="<?php echo esc_attr(get_option('am_gdpr_google_id')); ?>"
        metaPixelID="<?php echo esc_attr(get_option('am_gdpr_meta_id')); ?>"
        snapChatPixelID="<?php echo esc_attr(get_option('am_gdpr_snap_id')); ?>"
        tiktokPixelID="<?php echo esc_attr(get_option('am_gdpr_tiktok_id')); ?>"
        color="<?php echo esc_attr(get_option('am_gdpr_color')); ?>"
        accentColor="<?php echo esc_attr(get_option('am_gdpr_accent_color')); ?>"
        backgroundColor="<?php echo esc_attr(get_option('am_gdpr_background_color')); ?>"
        fontFamily="<?php echo esc_attr(get_option('am_gdpr_font_family')); ?>"
        borderWidth="<?php echo esc_attr(get_option('am_gdpr_border_width')); ?>"
        privacyPolicyURL="<?php echo esc_attr(get_option(('am_gdpr_wp_privacy_policy_url'))); ?>"
      ></am-gdpr>
        <?php
      }
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