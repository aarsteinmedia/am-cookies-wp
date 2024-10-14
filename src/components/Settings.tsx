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
			aamd_cookies_google_id: null,
			aamd_cookies_meta_id: null,
			aamd_cookies_snap_id: null,
			aamd_cookies_tiktok_id: null,
			aamd_cookies_align: Align.BottomLeft,
			aamd_cookies_align_mini: Align.BottomLeft,
			aamd_cookies_format: Format.Box,
			aamd_cookies_font_family: 'sans-serif',
			aamd_cookies_color: '#000000',
			aamd_cookies_accent_color: '#ffffff',
			aamd_cookies_background_color: '#ffffff',
			aamd_cookies_border_width: 2,
			aamd_cookies_text: getTranslation(),
			aamd_cookies_wp_privacy_policy_url: 'privacy-policy',
		} ),
		[ state, setState ] = useState( {
			loading: false,
			preview: false,
			tab: 'tracking',
			activeInput: '',
		} ),
		getData = useCallback( async () => {
			const options = await apiFetch< Options >( {
				path: 'am-cookies-settings/v1/options',
			} );
			setData( ( prev ) => {
				if ( ! options.aamd_cookies_text ) {
					return {
						...options,
						aamd_cookies_text: prev.aamd_cookies_text,
					};
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
					path: 'am-cookies-settings/v1/options',
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
		<section className="aamd-cookies-settings">
			<div className="aamd-cookies-header-wrapper">
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
							{ __( 'Cookies Settings', 'am-cookies' ) }
						</h1>
					</span>
					<SwitchLabel
						id="toggle-preview"
						title={ __( 'Preview', 'am-cookies' ) }
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
						{ __( 'Tracking', 'am-cookies' ) }
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
						{ __( 'Layout', 'am-cookies' ) }
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
						{ __( 'Content', 'am-cookies' ) }
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
						className="aamd-cookies-form"
						onSubmit={ ( e ) => void saveChanges( e ) }
					>
						<fieldset
							id="tracking"
							hidden={ state.tab !== 'tracking' }
							className="aamd-cookies-fieldset"
						>
							<div>
								<label
									className="form-label"
									htmlFor="aamd_cookies_google_id"
								>
									{ __( 'Google Tracking ID', 'am-cookies' ) }

									<input
										id="aamd_cookies_google_id"
										name="aamd_cookies_google_id"
										value={
											data.aamd_cookies_google_id || ''
										}
										onChange={ onChangeHandler }
										type="text"
										onFocus={ () =>
											setState( ( prev ) => ( {
												...prev,
												activeInput:
													'aamd_cookies_google_id',
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
									htmlFor="aamd_cookies_meta_id"
								>
									{ __(
										'Meta/Facebook Pixel ID',
										'am-cookies'
									) }

									<input
										id="aamd_cookies_meta_id"
										name="aamd_cookies_meta_id"
										value={
											data.aamd_cookies_meta_id || ''
										}
										onChange={ onChangeHandler }
										type="text"
										disabled={ data.aamd_cookies_google_id?.startsWith(
											'GTM-'
										) }
										onFocus={ () =>
											setState( ( prev ) => ( {
												...prev,
												activeInput:
													'aamd_cookies_meta_id',
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
									htmlFor="aamd_cookies_snap_id"
								>
									{ __( 'SnapChat Pixel ID', 'am-cookies' ) }

									<input
										id="aamd_cookies_snap_id"
										name="aamd_cookies_snap_id"
										value={
											data.aamd_cookies_snap_id || ''
										}
										onChange={ onChangeHandler }
										type="text"
										disabled={ data.aamd_cookies_google_id?.startsWith(
											'GTM-'
										) }
										onFocus={ () =>
											setState( ( prev ) => ( {
												...prev,
												activeInput:
													'aamd_cookies_snap_id',
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
									htmlFor="aamd_cookies_tiktok_id"
								>
									{ __( 'TikTok ID', 'am-cookies' ) }
									<input
										id="aamd_cookies_tiktok_id"
										name="aamd_cookies_tiktok_id"
										value={
											data.aamd_cookies_tiktok_id || ''
										}
										onChange={ onChangeHandler }
										type="text"
										disabled={ data.aamd_cookies_google_id?.startsWith(
											'GTM-'
										) }
										onFocus={ () =>
											setState( ( prev ) => ( {
												...prev,
												activeInput:
													'aamd_cookies_tiktok_id',
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
										'aamd_cookies_google_id'
									}
								>
									{ __( 'Instructions', 'am-cookies' ) }
								</h3>
								<div
									className="info"
									hidden={
										state.activeInput !==
										'aamd_cookies_google_id'
									}
								>
									<p>
										{ __(
											'Enter GA4 tag ID or Tag Manager ID.',
											'am-cookies'
										) }
									</p>
									<p>
										{ __(
											"If you've already installed Analytics or Tag Manager on your page, please remove it. This plugin adds either Google Analytics or Google Tag Manager, depending on which Google tracking ID you enter. If you use Google Tag Manager, we reccomend you implement other tags, i. e. MetaPixel through that.",
											'am-cookies'
										) }
									</p>
								</div>
							</div>
						</fieldset>
						<fieldset
							id="layout"
							hidden={ state.tab !== 'layout' }
							className="aamd-cookies-fieldset"
						>
							<div>
								<label
									className="form-label"
									htmlFor="aamd_cookies_font_family"
								>
									{ __( 'Font Family', 'am-cookies' ) }
									<input
										id="aamd_cookies_font_family"
										name="aamd_cookies_font_family"
										value={ data.aamd_cookies_font_family }
										placeholder="sans-serif"
										onChange={ onChangeHandler }
										type="text"
									/>
								</label>

								<ColorInput
									label={ __( 'Color', 'am-cookies' ) }
									name="aamd_cookies_color"
									value={
										data.aamd_cookies_color || '#000000'
									}
									onChange={ onChangeHandler }
								/>

								<ColorInput
									label={ __( 'Accent Color', 'am-cookies' ) }
									name="aamd_cookies_accent_color"
									value={
										data.aamd_cookies_accent_color ||
										'#ffffff'
									}
									onChange={ onChangeHandler }
								/>

								<ColorInput
									label={ __(
										'Background Color',
										'am-cookies'
									) }
									name="aamd_cookies_background_color"
									value={
										data.aamd_cookies_background_color ||
										'#ffffff'
									}
									onChange={ onChangeHandler }
								/>

								<label
									className="form-label"
									htmlFor="aamd_cookies_border_width"
								>
									{ __( 'Border Width', 'am-cookies' ) }
									<input
										id="aamd_cookies_border_width"
										name="aamd_cookies_border_width"
										value={
											data.aamd_cookies_border_width ?? 2
										}
										onChange={ onChangeHandler }
										type="number"
									/>
								</label>
							</div>
							<div>
								<RadioControl
									selected={ data.aamd_cookies_align }
									onChange={ ( value ) =>
										setData( ( prev ) => ( {
											...prev,
											aamd_cookies_align: value as Align,
										} ) )
									}
									options={
										data.aamd_cookies_format === Format.Box
											? [
													{
														label: __(
															'Bottom Left',
															'am-cookies'
														),
														value: Align.BottomLeft,
													},
													{
														label: __(
															'Bottom Right',
															'am-cookies'
														),
														value: Align.BottomRight,
													},
													{
														label: __(
															'Top Left',
															'am-cookies'
														),
														value: Align.TopLeft,
													},
													{
														label: __(
															'Top Right',
															'am-cookies'
														),
														value: Align.TopRight,
													},
											  ]
											: [
													{
														label: __(
															'Bottom',
															'am-cookies'
														),
														value: Align.BottomLeft,
													},
													{
														label: __(
															'Top',
															'am-cookies'
														),
														value: Align.TopLeft,
													},
											  ]
									}
									name="aamd_cookies_align"
									label={ __(
										'Align Cookie Prompt',
										'am-cookies'
									) }
								/>
								<RadioControl
									selected={ data.aamd_cookies_format }
									onChange={ ( value ) =>
										setData( ( prev ) => ( {
											...prev,
											aamd_cookies_format:
												value as Format,
										} ) )
									}
									options={ [
										{
											label: __( 'Box', 'am-cookies' ),
											value: Format.Box,
										},
										{
											label: __( 'Banner', 'am-cookies' ),
											value: Format.Banner,
										},
									] }
									name="aamd_cookies_format"
									label={ __(
										'Format of Cookie Prompt',
										'am-cookies'
									) }
								/>
								<RadioControl
									selected={ `mini-${ data.aamd_cookies_align_mini }` }
									onChange={ ( value ) =>
										setData( ( prev ) => ( {
											...prev,
											aamd_cookies_align_mini:
												value.replace(
													'mini-',
													''
												) as Align,
										} ) )
									}
									options={ [
										{
											label: __(
												'Bottom Left',
												'am-cookies'
											),
											value: `mini-${ Align.BottomLeft }`,
										},
										{
											label: __(
												'Bottom Right',
												'am-cookies'
											),
											value: `mini-${ Align.BottomRight }`,
										},
										{
											label: __(
												'Top Left',
												'am-cookies'
											),
											value: `mini-${ Align.TopLeft }`,
										},
										{
											label: __(
												'Top Right',
												'am-cookies'
											),
											value: `mini-${ Align.TopRight }`,
										},
									] }
									name="aamd_cookies_align_mini"
									label={ __(
										'Align Mini Cookie Prompt',
										'am-cookies'
									) }
								/>
							</div>
						</fieldset>
						<fieldset
							id="content"
							hidden={ state.tab !== 'content' }
							className="aamd-cookies-fieldset"
						>
							<div>
								<h3 style={ { marginTop: '0' } }>
									{ __( 'Cookie Prompt', 'am-cookies' ) }
								</h3>
								<label
									className="form-label"
									htmlFor="aamd_cookies_text_header"
								>
									{ __( 'Header', 'am-cookies' ) }
									<input
										id="aamd_cookies_text_header"
										name="aamd_cookies_text"
										value={ data.aamd_cookies_text.header }
										onChange={ ( { target: { value } } ) =>
											setData( ( prev ) => ( {
												...prev,
												aamd_cookies_text: {
													...prev.aamd_cookies_text,
													header: value,
												},
											} ) )
										}
										type="text"
									/>
								</label>

								<label
									className="form-label"
									htmlFor="aamd_cookies_text_accept"
								>
									{ __( 'Accept-button', 'am-cookies' ) }
									<input
										id="aamd_cookies_text_accept"
										name="aamd_cookies_text"
										value={ data.aamd_cookies_text.accept }
										onChange={ ( { target: { value } } ) =>
											setData( ( prev ) => ( {
												...prev,
												aamd_cookies_text: {
													...prev.aamd_cookies_text,
													accept: value,
												},
											} ) )
										}
										type="text"
									/>
								</label>
								<label
									className="form-label"
									htmlFor="aamd_cookies_text_customize_label"
								>
									{ __( 'Customize-button', 'am-cookies' ) }
									<input
										id="aamd_cookies_text_customize_label"
										name="aamd_cookies_text"
										value={
											data.aamd_cookies_text.customize
												.label
										}
										onChange={ ( { target: { value } } ) =>
											setData( ( prev ) => ( {
												...prev,
												aamd_cookies_text: {
													...prev.aamd_cookies_text,
													customize: {
														...prev
															.aamd_cookies_text
															.customize,
														label: value,
													},
												},
											} ) )
										}
										type="text"
									/>
								</label>
								<h3>
									{ __( 'Mini-Cookie Prompt', 'am-cookies' ) }
								</h3>
								<label
									className="form-label"
									htmlFor="aamd_cookies_text_miniGDPR"
								>
									{ __( 'Aria-label', 'am-cookies' ) }
									<input
										id="aamd_cookies_text_miniGDPR"
										name="aamd_cookies_text"
										value={
											data.aamd_cookies_text.miniGDPR
										}
										onChange={ ( { target: { value } } ) =>
											setData( ( prev ) => ( {
												...prev,
												aamd_cookies_text: {
													...prev.aamd_cookies_text,
													miniGDPR: value,
												},
											} ) )
										}
										type="text"
									/>
								</label>
							</div>
							<div>
								<h3 style={ { marginTop: '0' } }>
									{ __( 'Customize settings', 'am-cookies' ) }
								</h3>
								<label
									className="form-label"
									htmlFor="aamd_cookies_text_customize_header"
								>
									{ __( 'Header', 'am-cookies' ) }
									<input
										id="aamd_cookies_text_customize_header"
										name="aamd_cookies_text"
										value={
											data.aamd_cookies_text.customize
												.header
										}
										onChange={ ( { target: { value } } ) =>
											setData( ( prev ) => ( {
												...prev,
												aamd_cookies_text: {
													...prev.aamd_cookies_text,
													customize: {
														...prev
															.aamd_cookies_text
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
									htmlFor="aamd_cookies_text_customize_text"
								>
									{ __( 'Main description', 'am-cookies' ) }
									<RichText
										id="aamd_cookies_text_customize_text"
										name="aamd_cookies_text"
										className="aamd_cookies_textarea"
										value={
											data.aamd_cookies_text.customize
												.text
										}
										allowedFormats={ [
											'core/bold',
											'core/italic',
										] }
										onChange={ ( value ) =>
											setData( ( prev ) => ( {
												...prev,
												aamd_cookies_text: {
													...prev.aamd_cookies_text,
													customize: {
														...prev
															.aamd_cookies_text
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
									htmlFor="aamd_cookies_text_customize_retargeting"
								>
									{ __(
										'Retargeting description',
										'am-cookies'
									) }
									<RichText
										id="aamd_cookies_text_customize_retargeting"
										name="aamd_cookies_text"
										className="aamd_cookies_textarea"
										value={
											data.aamd_cookies_text.customize
												.retargeting
										}
										allowedFormats={ [
											'core/bold',
											'core/italic',
										] }
										onChange={ ( value ) =>
											setData( ( prev ) => ( {
												...prev,
												aamd_cookies_text: {
													...prev.aamd_cookies_text,
													customize: {
														...prev
															.aamd_cookies_text
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
									htmlFor="aamd_cookies_wp_privacy_policy_url"
								>
									{ __( 'Privacy Policy URL', 'am-cookies' ) }
									<input
										id="aamd_cookies_wp_privacy_policy_url"
										name="aamd_cookies_wp_privacy_policy_url"
										value={
											data.aamd_cookies_wp_privacy_policy_url ||
											''
										}
										onChange={ onChangeHandler }
										onFocus={ () =>
											setState( ( prev ) => ( {
												...prev,
												activeInput:
													'aamd_cookies_wp_privacy_policy_url',
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
									htmlFor="aamd_cookies_text_customize_link"
								>
									{ __(
										'Privacy link description',
										'am-cookies'
									) }
									<RichText
										id="aamd_cookies_text_customize_link"
										name="aamd_cookies_text"
										className="aamd_cookies_textarea"
										value={
											data.aamd_cookies_text.customize
												.link
										}
										allowedFormats={ [
											'core/bold',
											'core/italic',
											'core/link',
										] }
										onChange={ ( value ) =>
											setData( ( prev ) => ( {
												...prev,
												aamd_cookies_text: {
													...prev.aamd_cookies_text,
													customize: {
														...prev
															.aamd_cookies_text
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
									htmlFor="aamd_cookies_text_decline"
								>
									{ __( 'Decline-button', 'am-cookies' ) }
									<input
										id="aamd_cookies_text_decline"
										name="aamd_cookies_text"
										value={ data.aamd_cookies_text.decline }
										onChange={ ( { target: { value } } ) =>
											setData( ( prev ) => ( {
												...prev,
												aamd_cookies_text: {
													...prev.aamd_cookies_text,
													decline: value,
												},
											} ) )
										}
										type="text"
									/>
								</label>

								<label
									className="form-label"
									htmlFor="aamd_cookies_text_accept_all"
								>
									{ __( 'Accept all-button', 'am-cookies' ) }
									<input
										id="aamd_cookies_text_accept_all"
										name="aamd_cookies_text"
										value={
											data.aamd_cookies_text.acceptAll
										}
										onChange={ ( { target: { value } } ) =>
											setData( ( prev ) => ( {
												...prev,
												aamd_cookies_text: {
													...prev.aamd_cookies_text,
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
								__( 'Save', 'am-cookies' )
							) }
						</button>
					</form>
				</div>
			</main>
			{ state.preview && <Preview data={ data } /> }
		</section>
	);
}
