import { useCallback, useEffect, useState } from '@wordpress/element';
import { RadioControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import Loading from './Loading';
import Logo from './Logo';
import { Align, Format } from '@/utils';
import SwitchLabel from './Switch';
import ColorInput from './ColorInput';
import Preview from './Preview';
import type { ChangeEvent, FormEvent } from 'react';
import type { Options } from '@/types';

export default function Settings() {
	const [ data, setData ] = useState< Options >( {
			am_gdpr_google_id: null,
			am_gdpr_meta_id: null,
			am_gdpr_snap_id: null,
			am_gdpr_tiktok_id: null,
			am_gdpr_align: Align.BottomLeft,
			am_gdpr_format: Format.Box,
			am_gdpr_font_family: 'sans-serif',
			am_gdpr_color: '#000000',
			am_gdpr_accent_color: '#ffffff',
			am_gdpr_background_color: '#ffffff',
			am_gdpr_border_width: 2,
			am_gdpr_text: null,
			am_gdpr_wp_privacy_policy_url: 'privacy-policy',
		} ),
		[ state, setState ] = useState( {
			loading: false,
			preview: false,
			tab: 'tracking',
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
		},
		saveChanges = async ( e: FormEvent ) => {
			e.preventDefault();

			try {
				setState( ( prev ) => ( { ...prev, loading: true } ) );
				await apiFetch( {
					path: 'am-gdpr-wp-settings/v1/options',
					method: 'POST',
					data,
				} );
			} catch ( err ) {
				console.error( err );
			} finally {
				setTimeout( () => {
					setState( ( prev ) => ( {
						...prev,
						loading: false,
					} ) );
				}, 400 );
			}
		};

	useEffect( () => {
		void getData();
	}, [ getData ] );
	return (
		<section className="am-gdpr-settings">
			<div className="am-gdpr-header-wrapper">
				<header>
					<span
						style={ {
							display: 'flex',
							gap: '.7em',
							alignItems: 'center',
						} }
					>
						<Logo
							style={ {
								width: '3em',
								height: '3em',
							} }
						/>
						<h1 style={ { margin: '0' } }>
							{ __( 'Cookies Settings', 'am-gdpr-wp' ) }
						</h1>
					</span>
					<SwitchLabel
						id="toggle-preview"
						title={ __( 'Preview', 'am-gdpr-wp' ) }
						value={ state.preview }
						onChange={ () =>
							setState( ( prev ) => ( {
								...prev,
								preview: ! prev.preview,
							} ) )
						}
					/>
				</header>
				<nav>
					<a
						href="/#tracking"
						data-active={ state.tab === 'tracking' }
						onClick={ ( e ) => {
							e.preventDefault();
							setState( ( prev ) => ( {
								...prev,
								tab: 'tracking',
							} ) );
						} }
					>
						{ __( 'Tracking', 'am-gdpr-wp' ) }
					</a>
					<a
						href="/#layout"
						data-active={ state.tab === 'layout' }
						onClick={ ( e ) => {
							e.preventDefault();
							setState( ( prev ) => ( {
								...prev,
								tab: 'layout',
							} ) );
						} }
					>
						{ __( 'Layout', 'am-gdpr-wp' ) }
					</a>
					<a
						href="/#content"
						data-active={ state.tab === 'content' }
						onClick={ ( e ) => {
							e.preventDefault();
							setState( ( prev ) => ( {
								...prev,
								tab: 'content',
							} ) );
						} }
					>
						{ __( 'Content', 'am-gdpr-wp' ) }
					</a>
				</nav>
			</div>

			<main
				style={ {
					marginTop: '157px',
				} }
			>
				<div className="content">
					{ /* <p>
						{ __(
							'If you already have installed Analytics or Tag Manager on your page – remove it. This plugin adds either Google Analytics or Google Tag Manager, depending on which Google tracking ID you enter below. If you use Google Tag Manager, we reccomend you use that to implement other tags, i. e. MetaPixel.',
							'am-gdpr-wp'
						) }
					</p> */ }
					<form
						className="am-gdpr-form"
						onSubmit={ ( e ) => void saveChanges( e ) }
					>
						<fieldset
							id="tracking"
							hidden={ state.tab !== 'tracking' }
							className="am-gdpr-fieldset"
						>
							<label
								className="form-label"
								htmlFor="am_gdpr_google_id"
							>
								{ __( 'Google Tracking ID', 'am-gdpr-wp' ) }

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
							</label>

							<label
								className="form-label"
								htmlFor="am_gdpr_meta_id"
							>
								{ __( 'Meta/Facebook Pixel ID', 'am-gdpr-wp' ) }

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
							</label>
							<label
								className="form-label"
								htmlFor="am_gdpr_snap_id"
							>
								{ __( 'SnapChat Pixel ID', 'am-gdpr-wp' ) }

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
							</label>

							<label
								className="form-label"
								htmlFor="am_gdpr_tiktok_id"
							>
								{ __( 'TikTok ID', 'am-gdpr-wp' ) }
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
							</label>

							<label
								className="form-label"
								htmlFor="am_gdpr_wp_privacy_policy_url"
							>
								{ __( 'Privacy Policy URL', 'am-gdpr-wp' ) }
								<input
									id="am_gdpr_wp_privacy_policy_url"
									name="am_gdpr_wp_privacy_policy_url"
									value={
										data.am_gdpr_wp_privacy_policy_url || ''
									}
									onChange={ onChangeHandler }
									type="text"
								/>
							</label>
						</fieldset>
						<fieldset
							id="layout"
							hidden={ state.tab !== 'layout' }
							className="am-gdpr-fieldset"
							style={ {
								display:
									state.tab === 'layout' ? 'flex' : 'none',
								gap: '2.5em',
							} }
						>
							<div>
								<label
									className="form-label"
									htmlFor="am_gdpr_font_family"
								>
									{ __( 'Font Family', 'am-gdpr-wp' ) }
									<input
										id="am_gdpr_font_family"
										name="am_gdpr_font_family"
										value={ data.am_gdpr_font_family }
										placeholder="sans-serif"
										onChange={ onChangeHandler }
										type="text"
									/>
								</label>

								<ColorInput
									label={ __( 'Color', 'am-gdpr-wp' ) }
									name="am_gdpr_color"
									value={ data.am_gdpr_color || '#000000' }
									onChange={ onChangeHandler }
								/>

								<ColorInput
									label={ __( 'Accent Color', 'am-gdpr-wp' ) }
									name="am_gdpr_accent_color"
									value={
										data.am_gdpr_accent_color || '#ffffff'
									}
									onChange={ onChangeHandler }
								/>

								<ColorInput
									label={ __(
										'Background Color',
										'am-gdpr-wp'
									) }
									name="am_gdpr_background_color"
									value={
										data.am_gdpr_background_color ||
										'#ffffff'
									}
									onChange={ onChangeHandler }
								/>

								<label
									className="form-label"
									htmlFor="am_gdpr_border_width"
								>
									{ __( 'Border Width', 'am-gdpr-wp' ) }
									<input
										id="am_gdpr_border_width"
										name="am_gdpr_border_width"
										value={ data.am_gdpr_border_width ?? 2 }
										onChange={ onChangeHandler }
										type="number"
									/>
								</label>
							</div>
							<div>
								<RadioControl
									selected={ data.am_gdpr_align }
									onChange={ ( value ) =>
										setData( ( prev ) => ( {
											...prev,
											am_gdpr_align: value as Align,
										} ) )
									}
									options={
										data.am_gdpr_format === Format.Box
											? [
													{
														label: __(
															'Bottom Left',
															'am-gdpr-wp'
														),
														value: Align.BottomLeft,
													},
													{
														label: __(
															'Bottom Right',
															'am-gdpr-wp'
														),
														value: Align.BottomRight,
													},
													{
														label: __(
															'Top Left',
															'am-gdpr-wp'
														),
														value: Align.TopLeft,
													},
													{
														label: __(
															'Top Right',
															'am-gdpr-wp'
														),
														value: Align.TopRight,
													},
											  ]
											: [
													{
														label: __(
															'Bottom',
															'am-gdpr-wp'
														),
														value: Align.BottomLeft,
													},
													{
														label: __(
															'Top',
															'am-gdpr-wp'
														),
														value: Align.TopLeft,
													},
											  ]
									}
									name="am_gdpr_align"
									label={ __(
										'Align Cookie Prompt',
										'am-gdpr-wp'
									) }
								/>
								<RadioControl
									selected={ data.am_gdpr_format }
									onChange={ ( value ) =>
										setData( ( prev ) => ( {
											...prev,
											am_gdpr_format: value as Format,
										} ) )
									}
									options={ [
										{
											label: __( 'Box', 'am-gdpr-wp' ),
											value: Format.Box,
										},
										{
											label: __( 'Banner', 'am-gdpr-wp' ),
											value: Format.Banner,
										},
									] }
									name="am_gdpr_format"
									label={ __(
										'Format of Cookie Prompt',
										'am-gdpr-wp'
									) }
								/>
							</div>
						</fieldset>
						<button type="submit" className="am-btn blue">
							{ state.loading ? (
								<Loading />
							) : (
								__( 'Save', 'am-gdpr-wp' )
							) }
						</button>
					</form>
				</div>
			</main>
			{ state.preview && <Preview data={ data } /> }
		</section>
	);
}
