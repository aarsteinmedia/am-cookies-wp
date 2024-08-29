import { useCallback, useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import Loading from './Loading';
import Logo from './Logo';
import type { ChangeEvent, FormEvent } from 'react';
import type { Text } from '@/types';

interface Options {
	am_gdpr_google_id: string | null;
	am_gdpr_meta_id: string | null;
	am_gdpr_snap_id: string | null;
	am_gdpr_tiktok_id: string | null;
	am_gdpr_font_family: string;
	am_gdpr_color: string;
	am_gdpr_accent_color: string;
	am_gdpr_background_color: string;
	am_gdpr_border_width: number;
	am_gdpr_text: Text | null;
	am_gdpr_wp_privacy_policy_url: string;
}

export default function Settings() {
	const [ data, setData ] = useState< Options >( {
			am_gdpr_google_id: null,
			am_gdpr_meta_id: null,
			am_gdpr_snap_id: null,
			am_gdpr_tiktok_id: null,
			am_gdpr_font_family: 'sans-serif',
			am_gdpr_color: '#000000',
			am_gdpr_accent_color: '#ffffff',
			am_gdpr_background_color: '#ffffff',
			am_gdpr_border_width: 2,
			am_gdpr_text: null,
			am_gdpr_wp_privacy_policy_url: 'privacy-policy',
		} ),
		[ loading, setLoading ] = useState( false ),
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
		},
		saveChanges = async ( e: FormEvent ) => {
			e.preventDefault();

			try {
				setLoading( true );
				await apiFetch( {
					path: 'am-gdpr-wp-settings/v1/options',
					method: 'POST',
					data,
				} );
			} catch ( err ) {
				console.error( err );
			} finally {
				setTimeout( () => {
					setLoading( false );
				}, 400 );
			}
		};

	useEffect( () => {
		void getData();
	}, [ getData ] );
	return (
		<section className="am-settings">
			<main>
				<div className="content">
					<div
						style={ {
							display: 'flex',
							alignItems: 'center',
							gap: '.5em',
						} }
					>
						<Logo
							style={ {
								width: '3em',
								height: '3em',
							} }
						/>
						<h1 style={ { marginTop: '0' } }>
							{ __( 'GDPR Settings', 'am-gdpr-wp' ) }
						</h1>
					</div>
					<p>
						{ __(
							'If you already have installed Analytics or Tag Manager on your page – remove it. This plugin adds either Google Analytics or Google Tag Manager, depending on which Google tracking ID you enter below. If you use Google Tag Manager, we reccomend you use that to implement other tags, i. e. MetaPixel.',
							'am-gdpr-wp'
						) }
					</p>
					<form onSubmit={ ( e ) => void saveChanges( e ) }>
						<fieldset className="am-fieldset">
							<label
								className="form-label"
								htmlFor="am_gdpr_google_id"
							>
								{ __( 'Google Tracking ID', 'am-gdpr-wp' ) }
							</label>
							<input
								id="am_gdpr_google_id"
								name="am_gdpr_google_id"
								value={ data.am_gdpr_google_id || '' }
								onChange={ onChangeHandler }
								type="text"
								// placeholder="G-XXXXXXXXXX / GTM-XXXXXXXXXX"
							/>
							<span className="form-helper">
								{ __(
									'GA4 tag or Tag Manager ID',
									'am-gdpr-wp'
								) }
							</span>

							<label
								className="form-label"
								htmlFor="am_gdpr_meta_id"
							>
								{ __( 'Meta/Facebook Pixel ID', 'am-gdpr-wp' ) }
							</label>
							<input
								id="am_gdpr_meta_id"
								name="am_gdpr_meta_id"
								value={ data.am_gdpr_meta_id || '' }
								onChange={ onChangeHandler }
								type="text"
								disabled={ data.am_gdpr_google_id?.startsWith(
									'GTM-'
								) }
								// placeholder="000000000000000"
							/>

							<label
								className="form-label"
								htmlFor="am_gdpr_snap_id"
							>
								{ __( 'SnapChat Pixel ID', 'am-gdpr-wp' ) }
							</label>
							<input
								id="am_gdpr_snap_id"
								name="am_gdpr_snap_id"
								value={ data.am_gdpr_snap_id || '' }
								onChange={ onChangeHandler }
								type="text"
								disabled={ data.am_gdpr_google_id?.startsWith(
									'GTM-'
								) }
								// placeholder="11a1111a-1a1a-111a-1a11-aa1aa111a1aa"
							/>

							<label
								className="form-label"
								htmlFor="am_gdpr_tiktok_id"
							>
								{ __( 'TikTok ID', 'am-gdpr-wp' ) }
							</label>
							<input
								id="am_gdpr_tiktok_id"
								name="am_gdpr_tiktok_id"
								value={ data.am_gdpr_tiktok_id || '' }
								onChange={ onChangeHandler }
								type="text"
								disabled={ data.am_gdpr_google_id?.startsWith(
									'GTM-'
								) }
								// placeholder="A1AAA1AA1AAA1AAAAA1AA"
							/>

							<label
								className="form-label"
								htmlFor="am_gdpr_wp_privacy_policy_url"
							>
								{ __( 'Privacy Policy URL', 'am-gdpr-wp' ) }
							</label>
							<input
								id="am_gdpr_wp_privacy_policy_url"
								name="am_gdpr_wp_privacy_policy_url"
								value={
									data.am_gdpr_wp_privacy_policy_url || ''
								}
								onChange={ onChangeHandler }
								type="text"
							/>
						</fieldset>
						<fieldset className="am-fieldset">
							<h2 style={ { marginTop: '0' } }>
								{ __( 'Style', 'am-gdpr-wp' ) }
							</h2>
							<label
								className="form-label"
								htmlFor="am_gdpr_font_family"
							>
								{ __( 'Font Family', 'am-gdpr-wp' ) }
							</label>
							<input
								id="am_gdpr_font_family"
								name="am_gdpr_font_family"
								value={ data.am_gdpr_font_family }
								placeholder="sans-serif"
								onChange={ onChangeHandler }
								type="text"
							/>

							<label
								className="form-label"
								htmlFor="am_gdpr_color"
							>
								{ __( 'Color', 'am-gdpr-wp' ) }
							</label>
							<input
								id="am_gdpr_color"
								name="am_gdpr_color"
								value={ data.am_gdpr_color || '#000000' }
								onChange={ onChangeHandler }
								type="color"
							/>

							<label
								className="form-label"
								htmlFor="am_gdpr_accent_color"
							>
								{ __( 'Accent Color', 'am-gdpr-wp' ) }
							</label>
							<input
								id="am_gdpr_accent_color"
								name="am_gdpr_accent_color"
								value={ data.am_gdpr_accent_color || '#ffffff' }
								onChange={ onChangeHandler }
								type="color"
							/>

							<label
								className="form-label"
								htmlFor="am_gdpr_background_color"
							>
								{ __( 'Background Color', 'am-gdpr-wp' ) }
							</label>
							<input
								id="am_gdpr_background_color"
								name="am_gdpr_background_color"
								value={
									data.am_gdpr_background_color || '#ffffff'
								}
								onChange={ onChangeHandler }
								type="color"
							/>

							<label
								className="form-label"
								htmlFor="am_gdpr_border_width"
							>
								{ __( 'Border Width', 'am-gdpr-wp' ) }
							</label>
							<input
								id="am_gdpr_border_width"
								name="am_gdpr_border_width"
								value={ data.am_gdpr_border_width ?? 2 }
								onChange={ onChangeHandler }
								type="number"
							/>
						</fieldset>
						<button type="submit" className="am-btn blue">
							{ loading ? (
								<Loading />
							) : (
								__( 'Save', 'am-gdpr_wp' )
							) }
						</button>
					</form>
				</div>
			</main>
			<div className="cookie-preview">
				<div
					className="cookie-container"
					style={ {
						fontFamily: data.am_gdpr_font_family,
						borderWidth: `${ data.am_gdpr_border_width }px`,
						backgroundColor:
							data.am_gdpr_background_color || '#FFF',
						color: data.am_gdpr_color || '#000',
					} }
				>
					<h2
						style={ {
							position: 'absolute',
							top: '-2em',
						} }
					>
						{ __( 'Preview:', 'am-gdpr-wp' ) }
					</h2>
					<div className="content">
						<div
							aria-describedby="cookie-warning-text"
							aria-labelledby="cookie-warning-text"
							aria-modal="false"
							role="dialog"
						>
							<p className="h3" id="cookie-warning-text">
								{ __( 'This website uses', 'am-gdpr-wp' ) }{ ' ' }
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="992"
									height="1024"
									viewBox="0 0 992 1024"
								>
									<path d="M810.112 4.992c-27.232 0-49.28 22.112-49.344 49.344 0 27.232 22.112 49.344 49.344 49.344s49.344-22.112 49.344-49.344c0-27.232-22.112-49.344-49.344-49.344zm13.184 429.728c-167.424 54.048-292.352-63.52-236.384-243.232-61.728-22.944-82.24-90.368-58.016-166.24C255.36 11.456 14.336 224.416.672 498.048c-13.792 273.536 196.896 506.432 470.368 520.32 273.6 13.792 506.528-196.896 520.32-470.464 1.248-24.736.672-49.184-1.664-73.088-69.952 43.008-123.84 23.52-166.432-40.032zm-575.52-35.392c40.992 0 74.176 33.248 74.176 74.176s-33.248 74.176-74.176 74.176c-40.992 0-74.176-33.248-74.176-74.176s33.248-74.176 74.176-74.176zm233.696 94.56c23.616 0 42.752 19.136 42.752 42.752s-19.136 42.752-42.752 42.752c-23.616 0-42.752-19.136-42.752-42.752-.096-23.616 19.072-42.752 42.752-42.752zM295.968 669.952c28.8 0 52.16 23.36 52.16 52.16s-23.36 52.16-52.16 52.16c-28.8 0-52.16-23.36-52.16-52.16 0-28.864 23.36-52.16 52.16-52.16zm112.384-399.008c22.624 0 40.832 18.304 40.832 40.832 0 22.624-18.304 40.832-40.832 40.832-22.624 0-40.832-18.304-40.832-40.832s18.304-40.832 40.832-40.832zm221.952 417.28c37.856 0 68.48 30.688 68.48 68.48 0 37.856-30.688 68.48-68.48 68.48-37.856 0-68.48-30.688-68.48-68.48s30.688-68.48 68.48-68.48zm144.224-492.608c25.408 0 46.048 20.64 46.048 46.048s-20.64 46.048-46.048 46.048-46.048-20.64-46.048-46.048 20.64-46.048 46.048-46.048z" />
								</svg>
							</p>
						</div>
						<div className="button-wrapper">
							<button
								className="button gdpr customize"
								style={ {
									color: data.am_gdpr_color || '#000',
									borderWidth: `${ data.am_gdpr_border_width }px`,
									backgroundColor: 'transparent',
								} }
							>
								{ __( 'Customize', 'am-gdpr-wp' ) }
							</button>
							<button
								className="button gdpr accept"
								style={ {
									color: data.am_gdpr_color || '#000',
									borderWidth: `${ data.am_gdpr_border_width }px`,
									backgroundColor:
										data.am_gdpr_accent_color || '#FFF',
								} }
							>
								{ __( 'I understand', 'am-gdpr-wp' ) }
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
