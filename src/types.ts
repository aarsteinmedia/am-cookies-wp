import text from '@/i18n/en.json';
import { Align, Format } from '@/utils';

type Text = typeof text;

export interface Options {
	am_gdpr_google_id: string | null;
	am_gdpr_meta_id: string | null;
	am_gdpr_snap_id: string | null;
	am_gdpr_tiktok_id: string | null;
	am_gdpr_align: Align;
	am_gdpr_format: Format;
	am_gdpr_font_family: string;
	am_gdpr_color: string;
	am_gdpr_accent_color: string;
	am_gdpr_background_color: string;
	am_gdpr_border_width: number;
	am_gdpr_text: Text;
	am_gdpr_wp_privacy_policy_url: string;
}
