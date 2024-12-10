<?php
namespace AAMD_Cookies;

defined( 'ABSPATH' ) || exit;

class Frontend {

	public function __construct() {
		add_action( 'wp_enqueue_scripts', array( $this, 'init' ) );
	}

	public function add_web_component() {
		\ob_start(); ?>
		<am-cookies
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
			privacyPolicyURL="<?php echo esc_attr( get_option( ( 'aamd_cookies_wp_privacy_policy_url' ) ) ); ?>"></am-cookies>
		<?php
		echo wp_kses(
			\ob_get_clean(),
			array(
				'am-cookies' => array(
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

	public function init() {
		if ( is_admin() ) {
			return;
		}
		wp_enqueue_script(
			'am-cookies',
			AAMD_COOKIES_URL . 'scripts/am-gdpr.min.js',
			array(),
			'2.0.0',
			false
		);

		wp_enqueue_script(
			'am-cookies-text',
			AAMD_COOKIES_URL . 'scripts/add-text.js',
			array( 'am-cookies' ),
			'1.0.0',
			true
		);

		$text = wp_json_encode( get_option( 'aamd_cookies_text' ) );

		wp_add_inline_script(
			'am-cookies-text',
			"amCookiesElement?.setText({$text})"
		);

		add_action( 'wp_body_open', array( $this, 'add_web_component' ) );
	}
}

/**
 * Main function, to initialize class
 *
 * @return Frontend
 */
( function () {
	global $aamd_cookies_frontend;

	if ( ! isset( $aamd_cookies_frontend ) ) {
		$aamd_cookies_frontend = new Frontend();
	}

	return $aamd_cookies_frontend;
} )();
