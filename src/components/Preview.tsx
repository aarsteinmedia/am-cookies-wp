import {
	useCallback,
	useEffect,
	useId,
	useRef,
	useState,
} from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import type { Options } from '@/types';

export default function Preview( { data }: { data: Options } ) {
	const [ state, setState ] = useState( {
			isCustomize: false,
			dialogHeight: 0,
		} ),
		dialogInner = useRef< HTMLDivElement >( null ),
		hasRetargeting =
			data.am_gdpr_google_id?.startsWith( 'GTM-' ) ||
			!! data.am_gdpr_meta_id ||
			!! data.am_gdpr_snap_id ||
			!! data.am_gdpr_tiktok_id,
		esc = useCallback(
			( { key }: KeyboardEvent ) => {
				if ( ! state.isCustomize || key !== 'Escape' ) {
					return;
				}
				setState( ( prev ) => ( { ...prev, isCustomize: false } ) );
			},
			[ state.isCustomize ]
		);

	useEffect( () => {
		if ( dialogInner.current ) {
			setState( ( prev ) => ( {
				...prev,
				dialogHeight: prev.isCustomize
					? ( dialogInner.current?.offsetHeight || 0 ) + 80
					: 0,
			} ) );
		}
	}, [ state.isCustomize ] );
	useEffect( () => {
		addEventListener( 'keydown', esc );
		return () => {
			removeEventListener( 'keydown', esc );
		};
	}, [ esc ] );
	return (
		<div className="cookie-preview">
			<style>
				{
					/* CSS */ `.cookie-preview {
          --border-width: ${ data.am_gdpr_border_width }px;
          --font-family: ${ data.am_gdpr_font_family };
          --color: ${ data.am_gdpr_color };
          --background-color: ${ data.am_gdpr_background_color };
          --accent-color: ${ data.am_gdpr_accent_color };
        }`
				}
			</style>
			{ state.isCustomize ? (
				<div
					className="pop-up fadeIn"
					lang={ document.documentElement.lang }
				>
					<dialog
						open
						style={ {
							minHeight: `${ state.dialogHeight }px`,
							maxHeight: `${ state.dialogHeight }px`,
						} }
					>
						<button
							className="menu-button close-button"
							data-open="true"
							onClick={ () =>
								setState( ( prev ) => ( {
									...prev,
									isCustomize: false,
								} ) )
							}
						>
							<span className="hamburger">
								<span></span>
							</span>
						</button>
						<div
							className="dialog-inner-box"
							style={ {
								display: 'flex',
								flexDirection: 'column',
							} }
							ref={ dialogInner }
						>
							<h3>
								<figure
									aria-label="cookies"
									className="icon-cookies"
									style={ {
										display: 'inline-flex',
										marginRight: '0.5em',
									} }
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="992"
										height="1024"
										viewBox="0 0 992 1024"
									>
										<path d="M810.112 4.992c-27.232 0-49.28 22.112-49.344 49.344 0 27.232 22.112 49.344 49.344 49.344s49.344-22.112 49.344-49.344c0-27.232-22.112-49.344-49.344-49.344zm13.184 429.728c-167.424 54.048-292.352-63.52-236.384-243.232-61.728-22.944-82.24-90.368-58.016-166.24C255.36 11.456 14.336 224.416.672 498.048c-13.792 273.536 196.896 506.432 470.368 520.32 273.6 13.792 506.528-196.896 520.32-470.464 1.248-24.736.672-49.184-1.664-73.088-69.952 43.008-123.84 23.52-166.432-40.032zm-575.52-35.392c40.992 0 74.176 33.248 74.176 74.176s-33.248 74.176-74.176 74.176c-40.992 0-74.176-33.248-74.176-74.176s33.248-74.176 74.176-74.176zm233.696 94.56c23.616 0 42.752 19.136 42.752 42.752s-19.136 42.752-42.752 42.752c-23.616 0-42.752-19.136-42.752-42.752-.096-23.616 19.072-42.752 42.752-42.752zM295.968 669.952c28.8 0 52.16 23.36 52.16 52.16s-23.36 52.16-52.16 52.16c-28.8 0-52.16-23.36-52.16-52.16 0-28.864 23.36-52.16 52.16-52.16zm112.384-399.008c22.624 0 40.832 18.304 40.832 40.832 0 22.624-18.304 40.832-40.832 40.832-22.624 0-40.832-18.304-40.832-40.832s18.304-40.832 40.832-40.832zm221.952 417.28c37.856 0 68.48 30.688 68.48 68.48 0 37.856-30.688 68.48-68.48 68.48-37.856 0-68.48-30.688-68.48-68.48s30.688-68.48 68.48-68.48zm144.224-492.608c25.408 0 46.048 20.64 46.048 46.048s-20.64 46.048-46.048 46.048-46.048-20.64-46.048-46.048 20.64-46.048 46.048-46.048z" />
									</svg>
								</figure>
								<slot id="customize-header">
									{ __(
										'Your data, your choice',
										'am-gdpr-wp'
									) }
								</slot>
							</h3>
							<p
								id="customize-text"
								dangerouslySetInnerHTML={ {
									__html: `${ __(
										'We use <strong>functional cookies</strong> for navigation, etc. In addition, we use <strong>statistical cookies</strong> to see how users interact with the website.',
										'am-gpdr-wp'
									) }${
										hasRetargeting
											? ` ${ __(
													'We also use <strong>cookies for marketing.</strong',
													'am-gdpr-wp'
											  ) }`
											: ''
									}`,
								} }
							/>
							<p
								id="customize-link"
								dangerouslySetInnerHTML={ {
									__html: __(
										'See our <a href=#">privacy policy</a>',
										'am-gdpr-wp'
									),
								} }
							/>

							<div id="save-wrapper" className="button-wrapper">
								<button
									onClick={ () =>
										setState( ( prev ) => ( {
											...prev,
											isCustomize: false,
										} ) )
									}
									className="button gdpr decline-all"
									style={ { backgroundColor: 'transparent' } }
								>
									{ __( 'Only functional', 'am-gdpr-wp' ) }
								</button>
								<button
									onClick={ () =>
										setState( ( prev ) => ( {
											...prev,
											isCustomize: false,
										} ) )
									}
									className="button gdpr accept-all"
								>
									{ __( 'Accept all', 'am-gdpr-wp' ) }
								</button>
							</div>

							<div className="button-wrapper">
								<SwitchButton
									value={ true }
									name="functional"
									label={ __( 'Functional', 'am-gdpr-wp' ) }
									disabled
								/>
								<SwitchButton
									value={ false }
									name="statistical"
									label={ __( 'Statistical', 'am-gdpr-wp' ) }
								/>
								{ hasRetargeting && (
									<SwitchButton
										value={ false }
										name="marketing"
										label={ __(
											'Marketing',
											'am-gdpr-wp'
										) }
									/>
								) }
							</div>
						</div>
					</dialog>
				</div>
			) : (
				<div
					className={ `cookie-container ${ data.am_gdpr_align } ${ data.am_gdpr_format }-format` }
					lang={ document.documentElement.lang }
				>
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
								style={ { backgroundColor: 'transparent' } }
								onClick={ () =>
									setState( ( prev ) => ( {
										...prev,
										isCustomize: true,
									} ) )
								}
							>
								{ __( 'Customize', 'am-gdpr-wp' ) }
							</button>
							<button className="button gdpr accept">
								{ __( 'I understand', 'am-gdpr-wp' ) }
							</button>
						</div>
					</div>
				</div>
			) }
		</div>
	);
}

function SwitchButton( {
	disabled = false,
	name,
	label,
	value,
}: {
	disabled?: boolean;
	name: string;
	label?: string;
	value: boolean;
} ) {
	const id = useId(),
		[ checked, setChecked ] = useState( value );
	return (
		<div className="container">
			{ label && (
				<label className="textLabel" htmlFor={ id }>
					{ label }
				</label>
			) }
			{ /* eslint-disable-next-line jsx-a11y/label-has-associated-control*/ }
			<label className="label" htmlFor={ id }>
				<input
					checked={ checked }
					className="input"
					disabled={ disabled }
					id={ id }
					name={ name }
					type="checkbox"
					onChange={ () => setChecked( ( prev ) => ! prev ) }
				/>
				<span className="slider"></span>
			</label>
		</div>
	);
}
