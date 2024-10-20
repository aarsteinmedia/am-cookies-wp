<?php

defined( 'ABSPATH' ) || exit;

if ( ! class_exists( 'AAMD_COOKIES_Enqueue_Scripts' ) ) {
	class AAMD_COOKIES_Enqueue_Scripts {

		public function __construct() {
			add_action( 'wp_enqueue_scripts', array( $this, 'init' ) );
		}

		public function init() {
			if ( is_admin() ) {
				return;
			}
			wp_enqueue_script(
				'am-cookies',
				AAMD_COOKIES_URL . 'scripts/am-gdpr.min.js',
				array(),
				'1.0.2',
				false
			);

			add_action( 'wp_body_open', 'aamd_cookies_add_web_component' );
			function aamd_cookies_add_web_component() {
				ob_start(); ?>
		<am-gdpr
			googleID="<?php echo esc_attr( get_option( 'aamd_cookies_google_id' ) ); ?>"
			metaPixelID="<?php echo esc_attr( get_option( 'aamd_cookies_meta_id' ) ); ?>"
			snapChatPixelID="<?php echo esc_attr( get_option( 'aamd_cookies_snap_id' ) ); ?>"
			tiktokPixelID="<?php echo esc_attr( get_option( 'aamd_cookies_tiktok_id' ) ); ?>"
			alignPrompt="<?php echo esc_attr( get_option( 'aamd_cookies_align' ) ); ?>"
			alignMiniPrompt="<?php echo esc_attr( get_option( 'aamd_cookies_align_mini' ) ); ?>"
			format="<?php echo esc_attr( get_option( 'aamd_cookies_format' ) ); ?>"
			color="<?php echo esc_attr( get_option( 'aamd_cookies_color' ) ); ?>"
			accentColor="<?php echo esc_attr( get_option( 'aamd_cookies_accent_color' ) ); ?>"
			backgroundColor="<?php echo esc_attr( get_option( 'aamd_cookies_background_color' ) ); ?>"
			fontFamily="<?php echo esc_attr( get_option( 'aamd_cookies_font_family' ) ); ?>"
			borderWidth="<?php echo esc_attr( get_option( 'aamd_cookies_border_width' ) ); ?>"
			privacyPolicyURL="<?php echo esc_attr( get_option( ( 'aamd_cookies_wp_privacy_policy_url' ) ) ); ?>"></am-gdpr>
				<?php
				echo wp_kses(
					ob_get_clean(),
					array(
						'am-gdpr' => array(
							'googleid'         => array(),
							'metapixelid'      => array(),
							'snapchatpixelid'  => array(),
							'tiktokpixelid'    => array(),
							'alignprompt'      => array(),
							'alignminiprompt'  => array(),
							'format'           => array(),
							'color'            => array(),
							'accentcolor'      => array(),
							'backgroundcolor'  => array(),
							'fontfamily'       => array(),
							'borderwidth'      => array(),
							'privacypolicyurl' => array(),
						),
					)
				);
			}
		}
	}
}

/**
 * Main function, to initialize class
 *
 * @return AAMD_COOKIES_Enqueue_Scripts
 */
( function () {
	global $aamd_cookies_enqueue_scripts;

	if ( ! isset( $aamd_cookies_enqueue_scripts ) ) {
		$aamd_cookies_enqueue_scripts = new AAMD_COOKIES_Enqueue_Scripts();
	}

	return $aamd_cookies_enqueue_scripts;
} )();
