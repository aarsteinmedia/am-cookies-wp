import { useCallback, useEffect, useState } from '@wordpress/element';
import { RadioControl } from '@wordpress/components';
import { RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import Loading from './Loading';
import Logo from './Logo';
import { Align, Format } from '@/utils';
import SwitchLabel from './Switch';
import ColorInput from './ColorInput';
import Preview from './Preview';
import getTranslation from '@/i18n';
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
			am_gdpr_text: getTranslation(),
			am_gdpr_wp_privacy_policy_url: 'privacy-policy',
		} ),
		[ state, setState ] = useState( {
			loading: false,
			preview: false,
			tab: 'tracking',
			activeInput: '',
		} ),
		getData = useCallback( async () => {
			const options = await apiFetch< Options >( {
				path: 'am-cookies-wp-settings/v1/options',
			} );
			setData( ( prev ) => {
				if ( ! options.am_gdpr_text ) {
					return { ...options, am_gdpr_text: prev.am_gdpr_text };
				}
				return options;
			} );
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
					path: 'am-cookies-wp-settings/v1/options',
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
							{ __( 'Cookies Settings', 'am-cookies-wp' ) }
						</h1>
					</span>
					<SwitchLabel
						id="toggle-preview"
						title={ __( 'Preview', 'am-cookies-wp' ) }
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
						{ __( 'Tracking', 'am-cookies-wp' ) }
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
						{ __( 'Layout', 'am-cookies-wp' ) }
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
						{ __( 'Content', 'am-cookies-wp' ) }
					</a>
				</nav>
			</div>

			<main
				style={ {
					marginTop: '157px',
				} }
			>
				<div className="content">
					<form
						className="am-gdpr-form"
						onSubmit={ ( e ) => void saveChanges( e ) }
					>
						<fieldset
							id="tracking"
							hidden={ state.tab !== 'tracking' }
							className="am-gdpr-fieldset"
						>
							<div>
								<label
									className="form-label"
									htmlFor="am_gdpr_google_id"
								>
									{ __(
										'Google Tracking ID',
										'am-cookies-wp'
									) }

									<input
										id="am_gdpr_google_id"
										name="am_gdpr_google_id"
										value={ data.am_gdpr_google_id || '' }
										onChange={ onChangeHandler }
										type="text"
										onFocus={ () =>
											setState( ( prev ) => ( {
												...prev,
												activeInput:
													'am_gdpr_google_id',
											} ) )
										}
										onBlur={ () =>
											setState( ( prev ) => ( {
												...prev,
												activeInput: '',
											} ) )
										}
										// placeholder="G-XXXXXXXXXX / GTM-XXXXXXXXXX"
									/>
								</label>

								<label
									className="form-label"
									htmlFor="am_gdpr_meta_id"
								>
									{ __(
										'Meta/Facebook Pixel ID',
										'am-cookies-wp'
									) }

									<input
										id="am_gdpr_meta_id"
										name="am_gdpr_meta_id"
										value={ data.am_gdpr_meta_id || '' }
										onChange={ onChangeHandler }
										type="text"
										disabled={ data.am_gdpr_google_id?.startsWith(
											'GTM-'
										) }
										onFocus={ () =>
											setState( ( prev ) => ( {
												...prev,
												activeInput: 'am_gdpr_meta_id',
											} ) )
										}
										onBlur={ () =>
											setState( ( prev ) => ( {
												...prev,
												activeInput: '',
											} ) )
										}
										// placeholder="000000000000000"
									/>
								</label>
								<label
									className="form-label"
									htmlFor="am_gdpr_snap_id"
								>
									{ __(
										'SnapChat Pixel ID',
										'am-cookies-wp'
									) }

									<input
										id="am_gdpr_snap_id"
										name="am_gdpr_snap_id"
										value={ data.am_gdpr_snap_id || '' }
										onChange={ onChangeHandler }
										type="text"
										disabled={ data.am_gdpr_google_id?.startsWith(
											'GTM-'
										) }
										onFocus={ () =>
											setState( ( prev ) => ( {
												...prev,
												activeInput: 'am_gdpr_snap_id',
											} ) )
										}
										onBlur={ () =>
											setState( ( prev ) => ( {
												...prev,
												activeInput: '',
											} ) )
										}
										// placeholder="11a1111a-1a1a-111a-1a11-aa1aa111a1aa"
									/>
								</label>

								<label
									className="form-label"
									htmlFor="am_gdpr_tiktok_id"
								>
									{ __( 'TikTok ID', 'am-cookies-wp' ) }
									<input
										id="am_gdpr_tiktok_id"
										name="am_gdpr_tiktok_id"
										value={ data.am_gdpr_tiktok_id || '' }
										onChange={ onChangeHandler }
										type="text"
										disabled={ data.am_gdpr_google_id?.startsWith(
											'GTM-'
										) }
										onFocus={ () =>
											setState( ( prev ) => ( {
												...prev,
												activeInput:
													'am_gdpr_tiktok_id',
											} ) )
										}
										onBlur={ () =>
											setState( ( prev ) => ( {
												...prev,
												activeInput: '',
											} ) )
										}
										// placeholder="A1AAA1AA1AAA1AAAAA1AA"
									/>
								</label>
							</div>
							<div>
								<h3
									className="fade-in"
									style={ {
										marginTop: '0',
									} }
									hidden={
										state.activeInput !==
										'am_gdpr_google_id'
									}
								>
									{ __( 'Instructions', 'am-cookies-wp' ) }
								</h3>
								<div
									className="info"
									hidden={
										state.activeInput !==
										'am_gdpr_google_id'
									}
								>
									<p>
										{ __(
											'Enter GA4 tag ID or Tag Manager ID.',
											'am-cookies-wp'
										) }
									</p>
									<p>
										{ __(
											"If you've already installed Analytics or Tag Manager on your page, please remove it. This plugin adds either Google Analytics or Google Tag Manager, depending on which Google tracking ID you enter. If you use Google Tag Manager, we reccomend you implement other tags, i. e. MetaPixel through that.",
											'am-cookies-wp'
										) }
									</p>
								</div>
							</div>
						</fieldset>
						<fieldset
							id="layout"
							hidden={ state.tab !== 'layout' }
							className="am-gdpr-fieldset"
						>
							<div>
								<label
									className="form-label"
									htmlFor="am_gdpr_font_family"
								>
									{ __( 'Font Family', 'am-cookies-wp' ) }
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
									label={ __( 'Color', 'am-cookies-wp' ) }
									name="am_gdpr_color"
									value={ data.am_gdpr_color || '#000000' }
									onChange={ onChangeHandler }
								/>

								<ColorInput
									label={ __(
										'Accent Color',
										'am-cookies-wp'
									) }
									name="am_gdpr_accent_color"
									value={
										data.am_gdpr_accent_color || '#ffffff'
									}
									onChange={ onChangeHandler }
								/>

								<ColorInput
									label={ __(
										'Background Color',
										'am-cookies-wp'
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
									{ __( 'Border Width', 'am-cookies-wp' ) }
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
															'am-cookies-wp'
														),
														value: Align.BottomLeft,
													},
													{
														label: __(
															'Bottom Right',
															'am-cookies-wp'
														),
														value: Align.BottomRight,
													},
													{
														label: __(
															'Top Left',
															'am-cookies-wp'
														),
														value: Align.TopLeft,
													},
													{
														label: __(
															'Top Right',
															'am-cookies-wp'
														),
														value: Align.TopRight,
													},
											  ]
											: [
													{
														label: __(
															'Bottom',
															'am-cookies-wp'
														),
														value: Align.BottomLeft,
													},
													{
														label: __(
															'Top',
															'am-cookies-wp'
														),
														value: Align.TopLeft,
													},
											  ]
									}
									name="am_gdpr_align"
									label={ __(
										'Align Cookie Prompt',
										'am-cookies-wp'
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
											label: __( 'Box', 'am-cookies-wp' ),
											value: Format.Box,
										},
										{
											label: __(
												'Banner',
												'am-cookies-wp'
											),
											value: Format.Banner,
										},
									] }
									name="am_gdpr_format"
									label={ __(
										'Format of Cookie Prompt',
										'am-cookies-wp'
									) }
								/>
							</div>
						</fieldset>
						<fieldset
							id="content"
							hidden={ state.tab !== 'content' }
							className="am-gdpr-fieldset"
						>
							<div>
								<h3 style={ { marginTop: '0' } }>
									{ __( 'Cookie Prompt', 'am-cookies-wp' ) }
								</h3>
								<label
									className="form-label"
									htmlFor="am_gdpr_text_header"
								>
									{ __( 'Header', 'am-cookies-wp' ) }
									<input
										id="am_gdpr_text_header"
										name="am_gdpr_text"
										value={ data.am_gdpr_text.header }
										onChange={ ( { target: { value } } ) =>
											setData( ( prev ) => ( {
												...prev,
												am_gdpr_text: {
													...prev.am_gdpr_text,
													header: value,
												},
											} ) )
										}
										type="text"
									/>
								</label>

								<label
									className="form-label"
									htmlFor="am_gdpr_text_accept"
								>
									{ __( 'Accept-button', 'am-cookies-wp' ) }
									<input
										id="am_gdpr_text_accept"
										name="am_gdpr_text"
										value={ data.am_gdpr_text.accept }
										onChange={ ( { target: { value } } ) =>
											setData( ( prev ) => ( {
												...prev,
												am_gdpr_text: {
													...prev.am_gdpr_text,
													accept: value,
												},
											} ) )
										}
										type="text"
									/>
								</label>
								<label
									className="form-label"
									htmlFor="am_gdpr_text_customize_label"
								>
									{ __(
										'Customize-button',
										'am-cookies-wp'
									) }
									<input
										id="am_gdpr_text_customize_label"
										name="am_gdpr_text"
										value={
											data.am_gdpr_text.customize.label
										}
										onChange={ ( { target: { value } } ) =>
											setData( ( prev ) => ( {
												...prev,
												am_gdpr_text: {
													...prev.am_gdpr_text,
													customize: {
														...prev.am_gdpr_text
															.customize,
														label: value,
													},
												},
											} ) )
										}
										type="text"
									/>
								</label>
							</div>
							<div>
								<h3 style={ { marginTop: '0' } }>
									{ __(
										'Customize settings',
										'am-cookies-wp'
									) }
								</h3>
								<label
									className="form-label"
									htmlFor="am_gdpr_text_customize_header"
								>
									{ __( 'Header', 'am-cookies-wp' ) }
									<input
										id="am_gdpr_text_customize_header"
										name="am_gdpr_text"
										value={
											data.am_gdpr_text.customize.header
										}
										onChange={ ( { target: { value } } ) =>
											setData( ( prev ) => ( {
												...prev,
												am_gdpr_text: {
													...prev.am_gdpr_text,
													customize: {
														...prev.am_gdpr_text
															.customize,
														header: value,
													},
												},
											} ) )
										}
										type="text"
									/>
								</label>

								<label
									className="form-label"
									htmlFor="am_gdpr_text_customize_text"
								>
									{ __(
										'Main description',
										'am-cookies-wp'
									) }
									<RichText
										id="am_gdpr_text_customize_text"
										name="am_gdpr_text"
										className="am_gdpr_textarea"
										value={
											data.am_gdpr_text.customize.text
										}
										allowedFormats={ [
											'core/bold',
											'core/italic',
										] }
										onChange={ ( value ) =>
											setData( ( prev ) => ( {
												...prev,
												am_gdpr_text: {
													...prev.am_gdpr_text,
													customize: {
														...prev.am_gdpr_text
															.customize,
														text: value,
													},
												},
											} ) )
										}
									/>
								</label>

								<label
									className="form-label"
									htmlFor="am_gdpr_text_customize_retargeting"
								>
									{ __(
										'Retargeting description',
										'am-cookies-wp'
									) }
									<RichText
										id="am_gdpr_text_customize_retargeting"
										name="am_gdpr_text"
										className="am_gdpr_textarea"
										value={
											data.am_gdpr_text.customize
												.retargeting
										}
										allowedFormats={ [
											'core/bold',
											'core/italic',
										] }
										onChange={ ( value ) =>
											setData( ( prev ) => ( {
												...prev,
												am_gdpr_text: {
													...prev.am_gdpr_text,
													customize: {
														...prev.am_gdpr_text
															.customize,
														retargeting: value,
													},
												},
											} ) )
										}
									/>
								</label>

								<label
									className="form-label"
									htmlFor="am_gdpr_wp_privacy_policy_url"
								>
									{ __(
										'Privacy Policy URL',
										'am-cookies-wp'
									) }
									<input
										id="am_gdpr_wp_privacy_policy_url"
										name="am_gdpr_wp_privacy_policy_url"
										value={
											data.am_gdpr_wp_privacy_policy_url ||
											''
										}
										onChange={ onChangeHandler }
										onFocus={ () =>
											setState( ( prev ) => ( {
												...prev,
												activeInput:
													'am_gdpr_wp_privacy_policy_url',
											} ) )
										}
										onBlur={ () =>
											setState( ( prev ) => ( {
												...prev,
												activeInput: '',
											} ) )
										}
										type="text"
									/>
								</label>

								<label
									className="form-label"
									htmlFor="am_gdpr_text_customize_link"
								>
									{ __(
										'Privacy link description',
										'am-cookies-wp'
									) }
									<RichText
										id="am_gdpr_text_customize_link"
										name="am_gdpr_text"
										className="am_gdpr_textarea"
										value={
											data.am_gdpr_text.customize.link
										}
										allowedFormats={ [
											'core/bold',
											'core/italic',
											'core/link',
										] }
										onChange={ ( value ) =>
											setData( ( prev ) => ( {
												...prev,
												am_gdpr_text: {
													...prev.am_gdpr_text,
													customize: {
														...prev.am_gdpr_text
															.customize,
														link: value,
													},
												},
											} ) )
										}
									/>
								</label>

								<label
									className="form-label"
									htmlFor="am_gdpr_text_decline"
								>
									{ __( 'Decline-button', 'am-cookies-wp' ) }
									<input
										id="am_gdpr_text_decline"
										name="am_gdpr_text"
										value={ data.am_gdpr_text.decline }
										onChange={ ( { target: { value } } ) =>
											setData( ( prev ) => ( {
												...prev,
												am_gdpr_text: {
													...prev.am_gdpr_text,
													decline: value,
												},
											} ) )
										}
										type="text"
									/>
								</label>

								<label
									className="form-label"
									htmlFor="am_gdpr_text_accept_all"
								>
									{ __(
										'Accept all-button',
										'am-cookies-wp'
									) }
									<input
										id="am_gdpr_text_accept_all"
										name="am_gdpr_text"
										value={ data.am_gdpr_text.acceptAll }
										onChange={ ( { target: { value } } ) =>
											setData( ( prev ) => ( {
												...prev,
												am_gdpr_text: {
													...prev.am_gdpr_text,
													acceptAll: value,
												},
											} ) )
										}
										type="text"
									/>
								</label>
							</div>
						</fieldset>
						<button type="submit" className="am-btn blue">
							{ state.loading ? (
								<Loading />
							) : (
								__( 'Save', 'am-cookies-wp' )
							) }
						</button>
					</form>
				</div>
			</main>
			{ state.preview && <Preview data={ data } /> }
		</section>
	);
}
