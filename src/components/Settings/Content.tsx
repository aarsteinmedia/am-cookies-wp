import type { Options, SettingsState } from '@/types'

import TextEditor from '@/components/TextEditor'
import { __ } from '@wordpress/i18n'

export default function Content({
	data,
	onChangeHandler,
	setData,
	setState,
	state,
}: Readonly<{
	data: Options
	setData: React.Dispatch<React.SetStateAction<Options>>
	onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
	state: SettingsState
	setState: React.Dispatch<React.SetStateAction<SettingsState>>
}>) {
	return (
		<fieldset
			className="aamd-cookies-fieldset"
			hidden={state.tab !== 'content'}
			id="content"
		>
			<div>
				<h3 style={{ marginTop: '0' }}>{__('Cookie Prompt', 'am-cookies')}</h3>
				<label className="form-label" htmlFor="aamd_cookies_text_header">
					{__('Header', 'am-cookies')}
					<input
						id="aamd_cookies_text_header"
						name="aamd_cookies_text"
						onChange={({ target: { value } }) =>
							setData((prev) => ({
								...prev,
								aamd_cookies_text: {
									...prev.aamd_cookies_text,
									header: value,
								},
							}))
						}
						type="text"
						value={data.aamd_cookies_text.header}
					/>
				</label>

				<label className="form-label" htmlFor="aamd_cookies_text_accept">
					{__('Accept-button', 'am-cookies')}
					<input
						id="aamd_cookies_text_accept"
						name="aamd_cookies_text"
						onChange={({ target: { value } }) =>
							setData((prev) => ({
								...prev,
								aamd_cookies_text: {
									...prev.aamd_cookies_text,
									accept: value,
								},
							}))
						}
						type="text"
						value={data.aamd_cookies_text.accept}
					/>
				</label>
				<label
					className="form-label"
					htmlFor="aamd_cookies_text_customize_label"
				>
					{__('Customize-button', 'am-cookies')}
					<input
						id="aamd_cookies_text_customize_label"
						name="aamd_cookies_text"
						onChange={({ target: { value } }) =>
							setData((prev) => ({
								...prev,
								aamd_cookies_text: {
									...prev.aamd_cookies_text,
									customize: {
										...prev.aamd_cookies_text.customize,
										label: value,
									},
								},
							}))
						}
						type="text"
						value={data.aamd_cookies_text.customize.label}
					/>
				</label>
				<h3>{__('Mini-Cookie Prompt', 'am-cookies')}</h3>
				<label className="form-label" htmlFor="aamd_cookies_text_miniGDPR">
					{__('Aria-label', 'am-cookies')}
					<input
						id="aamd_cookies_text_miniGDPR"
						name="aamd_cookies_text"
						onChange={({ target: { value } }) =>
							setData((prev) => ({
								...prev,
								aamd_cookies_text: {
									...prev.aamd_cookies_text,
									miniGDPR: value,
								},
							}))
						}
						type="text"
						value={data.aamd_cookies_text.miniGDPR}
					/>
				</label>
			</div>
			<div>
				<h3 style={{ marginTop: '0' }}>
					{__('Customize settings', 'am-cookies')}
				</h3>
				<label
					className="form-label"
					htmlFor="aamd_cookies_text_customize_header"
				>
					{__('Header', 'am-cookies')}
					<input
						id="aamd_cookies_text_customize_header"
						name="aamd_cookies_text"
						onChange={({ target: { value } }) =>
							setData((prev) => ({
								...prev,
								aamd_cookies_text: {
									...prev.aamd_cookies_text,
									customize: {
										...prev.aamd_cookies_text.customize,
										header: value,
									},
								},
							}))
						}
						type="text"
						value={data.aamd_cookies_text.customize.header}
					/>
				</label>

				<TextEditor
					id="aamd_cookies_text_customize_text"
					label={__('Main description', 'am-cookies')}
					name="aamd_cookies_text"
					setValue={(value) =>
						setData((prev) => ({
							...prev,
							aamd_cookies_text: {
								...prev.aamd_cookies_text,
								customize: {
									...prev.aamd_cookies_text.customize,
									text: value,
								},
							},
						}))
					}
					value={data.aamd_cookies_text.customize.text}
				/>

				<TextEditor
					id="aamd_cookies_text_customize_retargeting"
					label={__('Retargeting description', 'am-cookies')}
					name="aamd_cookies_text"
					setValue={(value) =>
						setData((prev) => ({
							...prev,
							aamd_cookies_text: {
								...prev.aamd_cookies_text,
								customize: {
									...prev.aamd_cookies_text.customize,
									retargeting: value,
								},
							},
						}))
					}
					value={data.aamd_cookies_text.customize.retargeting}
				/>

				<label
					className="form-label"
					htmlFor="aamd_cookies_wp_privacy_policy_url"
				>
					{__('Privacy Policy URL', 'am-cookies')}
					<input
						id="aamd_cookies_wp_privacy_policy_url"
						name="aamd_cookies_wp_privacy_policy_url"
						onBlur={() =>
							setState((prev) => ({
								...prev,
								activeInput: '',
							}))
						}
						onChange={onChangeHandler}
						onFocus={() =>
							setState((prev) => ({
								...prev,
								activeInput: 'aamd_cookies_wp_privacy_policy_url',
							}))
						}
						type="text"
						value={data.aamd_cookies_wp_privacy_policy_url || ''}
					/>
				</label>

				<TextEditor
					id="aamd_cookies_text_customize_link"
					label={__('Privacy link description', 'am-cookies')}
					name="aamd_cookies_text"
					setValue={(value) =>
						setData((prev) => ({
							...prev,
							aamd_cookies_text: {
								...prev.aamd_cookies_text,
								customize: {
									...prev.aamd_cookies_text.customize,
									link: value,
								},
							},
						}))
					}
					value={data.aamd_cookies_text.customize.link}
				/>

				<label className="form-label" htmlFor="aamd_cookies_text_decline">
					{__('Decline-button', 'am-cookies')}
					<input
						id="aamd_cookies_text_decline"
						name="aamd_cookies_text"
						onChange={({ target: { value } }) =>
							setData((prev) => ({
								...prev,
								aamd_cookies_text: {
									...prev.aamd_cookies_text,
									decline: value,
								},
							}))
						}
						type="text"
						value={data.aamd_cookies_text.decline}
					/>
				</label>

				<label className="form-label" htmlFor="aamd_cookies_text_accept_all">
					{__('Accept all-button', 'am-cookies')}
					<input
						id="aamd_cookies_text_accept_all"
						name="aamd_cookies_text"
						onChange={({ target: { value } }) =>
							setData((prev) => ({
								...prev,
								aamd_cookies_text: {
									...prev.aamd_cookies_text,
									acceptAll: value,
								},
							}))
						}
						type="text"
						value={data.aamd_cookies_text.acceptAll}
					/>
				</label>
			</div>
		</fieldset>
	)
}
