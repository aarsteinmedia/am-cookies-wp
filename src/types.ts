import text from '@/i18n/en.json';
import { Align, Format } from '@/enums';

type Text = typeof text;

export interface Options {
	aamd_cookies_google_id: string | null;
	aamd_cookies_meta_id: string | null;
	aamd_cookies_snap_id: string | null;
	aamd_cookies_tiktok_id: string | null;
	aamd_cookies_align: Align;
	aamd_cookies_align_mini: Align;
	aamd_cookies_format: Format;
	aamd_cookies_font_family: string;
	aamd_cookies_color: string;
	aamd_cookies_accent_color: string;
	aamd_cookies_background_color: string;
	aamd_cookies_border_width: number;
	aamd_cookies_text: Text;
	aamd_cookies_wp_privacy_policy_url: string;
}
