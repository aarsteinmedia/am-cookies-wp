import type { Options } from '@/types'

import CookieIcon from '@/components/CookieIcon'
import {
	useCallback,
	useEffect,
	useId,
	useRef,
	useState,
} from '@wordpress/element'

export default function Preview({ data }: { data: Options }) {
	const [state, setState] = useState({
			dialogHeight: 0,
			isCustomize: false,
			isMinimized: false,
		}),
		dialogInner = useRef<HTMLDivElement>(null),
		isInitialLoad = useRef(true),
		hasRetargeting =
			data.aamd_cookies_google_id?.startsWith('GTM-') ||
			!!data.aamd_cookies_meta_id ||
			!!data.aamd_cookies_snap_id ||
			!!data.aamd_cookies_tiktok_id,
		esc = useCallback(
			({ key }: KeyboardEvent) => {
				if (!state.isCustomize || key !== 'Escape') {
					return
				}
				setState((prev) => ({ ...prev, isCustomize: false }))
			},
			[state.isCustomize]
		)

	useEffect(() => {
		if (dialogInner.current) {
			setState((prev) => ({
				...prev,
				dialogHeight: prev.isCustomize
					? (dialogInner.current?.offsetHeight || 0) + 80
					: 0,
			}))
		}
	}, [state.isCustomize])
	useEffect(() => {
		if (isInitialLoad.current) {
			isInitialLoad.current = false
		} else {
			setState((prev) => ({
				...prev,
				isCustomize: false,
				isMinimized: true,
			}))
		}
	}, [data.aamd_cookies_align_mini])
	useEffect(() => {
		if (isInitialLoad.current) {
			isInitialLoad.current = false
		} else {
			setState((prev) => ({
				...prev,
				isCustomize: false,
				isMinimized: false,
			}))
		}
	}, [data.aamd_cookies_align])
	useEffect(() => {
		addEventListener('keydown', esc)
		return () => {
			removeEventListener('keydown', esc)
		}
	}, [esc])
	return (
		<div className="cookie-preview">
			<style>
				{
					/* CSS */ `.cookie-preview {
          --border-width: ${data.aamd_cookies_border_width}px;
          --font-family: ${data.aamd_cookies_font_family};
          --color: ${data.aamd_cookies_color};
          --background-color: ${data.aamd_cookies_background_color};
          --accent-color: ${data.aamd_cookies_accent_color};
        }`
				}
			</style>
			{state.isCustomize && (
				<div className="pop-up fadeIn" lang={document.documentElement.lang}>
					<dialog
						open
						style={{
							maxHeight: `${state.dialogHeight}px`,
							minHeight: `${state.dialogHeight}px`,
						}}
					>
						<button
							className="menu-button close-button"
							data-open="true"
							onClick={() =>
								setState((prev) => ({
									...prev,
									isCustomize: false,
									isMinimized: true,
								}))
							}
						>
							<span className="hamburger">
								<span></span>
							</span>
						</button>
						<div
							className="dialog-inner-box"
							ref={dialogInner}
							style={{
								display: 'flex',
								flexDirection: 'column',
							}}
						>
							<h3>
								<figure
									aria-label="cookies"
									className="icon-cookies"
									style={{
										display: 'inline-flex',
										marginRight: '0.5em',
									}}
								>
									<CookieIcon />
								</figure>
								<slot id="customize-header">
									{data.aamd_cookies_text.customize.header}
								</slot>
							</h3>
							<p
								dangerouslySetInnerHTML={{
									__html: `${data.aamd_cookies_text.customize.text}${
										hasRetargeting
											? ` ${data.aamd_cookies_text.customize.retargeting}`
											: ''
									}`,
								}}
								id="customize-text"
							/>
							<p
								dangerouslySetInnerHTML={{
									__html: data.aamd_cookies_text.customize.link.replace(
										'%URL%',
										data.aamd_cookies_wp_privacy_policy_url
									),
								}}
								id="customize-link"
							/>

							<div className="button-wrapper" id="save-wrapper">
								<button
									className="button gdpr decline-all"
									onClick={() =>
										setState((prev) => ({
											...prev,
											isCustomize: false,
											isMinimized: true,
										}))
									}
									style={{ backgroundColor: 'transparent' }}
								>
									{data.aamd_cookies_text.decline}
								</button>
								<button
									className="button gdpr accept-all"
									onClick={() =>
										setState((prev) => ({
											...prev,
											isCustomize: false,
											isMinimized: true,
										}))
									}
								>
									{data.aamd_cookies_text.acceptAll}
								</button>
							</div>

							<div className="button-wrapper">
								<SwitchButton
									disabled
									label={data.aamd_cookies_text.functional.label}
									name="functional"
									value={true}
								/>
								<SwitchButton
									label={data.aamd_cookies_text.statistical.label}
									name="statistical"
									value={false}
								/>
								{hasRetargeting && (
									<SwitchButton
										label={data.aamd_cookies_text.marketing.label}
										name="marketing"
										value={false}
									/>
								)}
							</div>
						</div>
					</dialog>
				</div>
			)}{' '}
			{!state.isCustomize && !state.isMinimized && (
				<div
					className={`cookie-container ${data.aamd_cookies_align} ${data.aamd_cookies_format}-format`}
					lang={document.documentElement.lang}
				>
					<div className="content">
						<div
							aria-describedby="cookie-warning-text"
							aria-labelledby="cookie-warning-text"
							aria-modal="false"
							role="dialog"
						>
							<p className="h3" id="cookie-warning-text">
								{data.aamd_cookies_text.header} <CookieIcon />
							</p>
						</div>
						<div className="button-wrapper">
							<button
								className="button gdpr customize"
								onClick={() =>
									setState((prev) => ({
										...prev,
										isCustomize: true,
										isMinimized: false,
									}))
								}
								style={{ backgroundColor: 'transparent' }}
							>
								{data.aamd_cookies_text.customize.label}
							</button>
							<button
								className="button gdpr accept"
								onClick={() =>
									setState((prev) => ({
										...prev,
										isMinimized: true,
									}))
								}
							>
								{data.aamd_cookies_text.accept}
							</button>
						</div>
					</div>
				</div>
			)}{' '}
			{!state.isCustomize && state.isMinimized && (
				<button
					aria-label={data.aamd_cookies_text.miniGDPR}
					className={`mini-gdpr ${data.aamd_cookies_align_mini}`}
					data-hide="false"
					onClick={() =>
						setState((prev) => ({
							...prev,
							isMinimized: false,
						}))
					}
				>
					<figure className="icon-cookies settings">
						<CookieIcon />
					</figure>
				</button>
			)}
		</div>
	)
}

function SwitchButton({
	disabled = false,
	label,
	name,
	value,
}: {
	disabled?: boolean
	name: string
	label?: string
	value: boolean
}) {
	const id = useId(),
		[checked, setChecked] = useState(value)
	return (
		<div className="container">
			{label && (
				<label className="textLabel" htmlFor={id}>
					{label}
				</label>
			)}
			{/* eslint-disable-next-line jsx-a11y/label-has-associated-control*/}
			<label className="label" htmlFor={id}>
				<input
					checked={checked}
					className="input"
					disabled={disabled}
					id={id}
					name={name}
					onChange={() => setChecked((prev) => !prev)}
					type="checkbox"
				/>
				<span className="slider"></span>
			</label>
		</div>
	)
}
