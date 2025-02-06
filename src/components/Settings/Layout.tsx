import type { Options, SettingsState } from '@/types'

import ColorInput from '@/components/ColorInput'
import { Align, Format } from '@/enums'
import { RadioControl } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

export default function Layout({
	data,
	onChangeHandler,
	setData,
	state,
}: Readonly<{
	data: Options
	setData: React.Dispatch<React.SetStateAction<Options>>
	onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
	state: SettingsState
}>) {
	return (
		<fieldset
			className="aamd-cookies-fieldset"
			hidden={state.tab !== 'layout'}
			id="layout"
		>
			<div>
				<label className="form-label" htmlFor="aamd_cookies_font_family">
					{__('Font Family', 'am-cookies')}
					<input
						id="aamd_cookies_font_family"
						name="aamd_cookies_font_family"
						onChange={onChangeHandler}
						placeholder="sans-serif"
						type="text"
						value={data.aamd_cookies_font_family}
					/>
				</label>

				<ColorInput
					label={__('Color', 'am-cookies')}
					name="aamd_cookies_color"
					onChange={onChangeHandler}
					value={data.aamd_cookies_color || '#000000'}
				/>

				<ColorInput
					label={__('Accent Color', 'am-cookies')}
					name="aamd_cookies_accent_color"
					onChange={onChangeHandler}
					value={data.aamd_cookies_accent_color || '#ffffff'}
				/>

				<ColorInput
					label={__('Background Color', 'am-cookies')}
					name="aamd_cookies_background_color"
					onChange={onChangeHandler}
					value={data.aamd_cookies_background_color || '#ffffff'}
				/>

				<label className="form-label" htmlFor="aamd_cookies_border_width">
					{__('Border Width', 'am-cookies')}
					<input
						id="aamd_cookies_border_width"
						name="aamd_cookies_border_width"
						onChange={onChangeHandler}
						type="number"
						value={data.aamd_cookies_border_width ?? 2}
					/>
				</label>
			</div>
			<div>
				<RadioControl
					label={__('Align Cookie Prompt', 'am-cookies')}
					name="aamd_cookies_align"
					onChange={(value) =>
						setData((prev) => ({
							...prev,
							aamd_cookies_align: value as Align,
						}))
					}
					options={
						data.aamd_cookies_format === Format.Box
							? [
									{
										label: __('Bottom Left', 'am-cookies'),
										value: Align.BottomLeft,
									},
									{
										label: __('Bottom Right', 'am-cookies'),
										value: Align.BottomRight,
									},
									{
										label: __('Top Left', 'am-cookies'),
										value: Align.TopLeft,
									},
									{
										label: __('Top Right', 'am-cookies'),
										value: Align.TopRight,
									},
							  ]
							: [
									{
										label: __('Bottom', 'am-cookies'),
										value: Align.BottomLeft,
									},
									{
										label: __('Top', 'am-cookies'),
										value: Align.TopLeft,
									},
							  ]
					}
					selected={data.aamd_cookies_align}
				/>
				<RadioControl
					label={__('Format of Cookie Prompt', 'am-cookies')}
					name="aamd_cookies_format"
					onChange={(value) =>
						setData((prev) => ({
							...prev,
							aamd_cookies_format: value as Format,
						}))
					}
					options={[
						{
							label: __('Box', 'am-cookies'),
							value: Format.Box,
						},
						{
							label: __('Banner', 'am-cookies'),
							value: Format.Banner,
						},
					]}
					selected={data.aamd_cookies_format}
				/>
				<RadioControl
					label={__('Align Mini Cookie Prompt', 'am-cookies')}
					name="aamd_cookies_align_mini"
					onChange={(value) =>
						setData((prev) => ({
							...prev,
							aamd_cookies_align_mini: value.replace('mini-', '') as Align,
						}))
					}
					options={[
						{
							label: __('Bottom Left', 'am-cookies'),
							value: `mini-${Align.BottomLeft}`,
						},
						{
							label: __('Bottom Right', 'am-cookies'),
							value: `mini-${Align.BottomRight}`,
						},
						{
							label: __('Top Left', 'am-cookies'),
							value: `mini-${Align.TopLeft}`,
						},
						{
							label: __('Top Right', 'am-cookies'),
							value: `mini-${Align.TopRight}`,
						},
					]}
					selected={`mini-${data.aamd_cookies_align_mini}`}
				/>
			</div>
		</fieldset>
	)
}
