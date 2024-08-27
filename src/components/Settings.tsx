import { useCallback, useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import type { ChangeEvent } from 'react';
import type { Text } from '@/types';

interface Options {
	am_gdpr_tracking_id: string | null;
	am_gdpr_font_family: string;
	am_gdpr_color: string;
	am_gdpr_accent_color: string;
	am_gdpr_background_color: string;
	am_gdpr_border_width: number;
	am_gdpr_text: Text | null;
}

export default function Settings() {
	const [ data, setData ] = useState< Options >( {
			am_gdpr_tracking_id: null,
			am_gdpr_font_family: 'sans-serif',
			am_gdpr_color: '#000',
			am_gdpr_accent_color: '#FFF',
			am_gdpr_background_color: '#FFF',
			am_gdpr_border_width: 2,
			am_gdpr_text: null,
		} ),
		getData = useCallback( async () => {
			const options = await apiFetch< Options >( {
				path: 'am-gdpr-wp-settings/v1/options',
			} );
			setData( options );
		}, [] ),
		onChangeHandler = ( { target }: ChangeEvent< HTMLInputElement > ) => {
			setData( ( prev ) => ( {
				...prev,
				[ target.name ]: target.value,
			} ) );
		};

	useEffect( () => {
		void getData();
	}, [ getData ] );
	return (
		<section className="am-settings">
			<main>
				<div className="content">
					<form>
						<fieldset>
							<label hidden htmlFor="am_gdpr_wp_tracking_id">
								{ __( 'Tracking ID', 'am-gdpr-wp' ) }
							</label>
							<input
								id="am_gdpr_wp_tracking_id"
								name="am_gdpr_tracking_id"
								value={ data.am_gdpr_tracking_id || '' }
								onChange={ onChangeHandler }
								type="text"
								placeholder={ __(
									'Tracking ID',
									'am-gdpr-wp'
								) }
							/>
						</fieldset>
					</form>
				</div>
			</main>
		</section>
	);
}
