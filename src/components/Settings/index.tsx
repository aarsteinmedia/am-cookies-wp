import { useCallback, useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import Loading from '../Loading';
import Logo from '../Logo';
import { Align, Format } from '@/enums';
import SwitchLabel from '../Switch';
import Preview from '../Preview';
import getTranslation from '@/i18n';
import type { ChangeEvent, FormEvent } from 'react';
import type { Options, SettingsState } from '@/types';
import Tracking from './Tracking';
import Layout from './Layout';
import Content from './Content';

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
		[ state, setState ] = useState< SettingsState >( {
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
						<Tracking
							data={ data }
							onChangeHandler={ onChangeHandler }
							setState={ setState }
							state={ state }
						/>
						<Layout
							data={ data }
							setData={ setData }
							onChangeHandler={ onChangeHandler }
							state={ state }
						/>
						<Content
							data={ data }
							setData={ setData }
							onChangeHandler={ onChangeHandler }
							setState={ setState }
							state={ state }
						/>
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
