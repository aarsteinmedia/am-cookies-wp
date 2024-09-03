import text from '@/i18n/en.json';
import { Align, Format } from '@/utils';

type Text = typeof text;

export interface Options {
	am_cookies_google_id: string | null;
	am_cookies_meta_id: string | null;
	am_cookies_snap_id: string | null;
	am_cookies_tiktok_id: string | null;
	am_cookies_align: Align;
	am_cookies_format: Format;
	am_cookies_font_family: string;
	am_cookies_color: string;
	am_cookies_accent_color: string;
	am_cookies_background_color: string;
	am_cookies_border_width: number;
	am_cookies_text: Text;
	am_cookies_wp_privacy_policy_url: string;
}
