import { RadioControl } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

import type { Options, SettingsState } from '@/types'

import ColorInput from '@/components/ColorInput'
import {
  Align, Format, domain
} from '@/enums'


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
          {__('Font Family', domain)}
          <input
            id="aamd_cookies_font_family"
            name="aamd_cookies_font_family"
            placeholder="sans-serif"
            type="text"
            value={data.aamd_cookies_font_family}
            onChange={onChangeHandler}
          />
        </label>

        <ColorInput
          label={__('Color', domain)}
          name="aamd_cookies_color"
          value={data.aamd_cookies_color || '#000000'}
          onChange={onChangeHandler}
        />

        <ColorInput
          label={__('Accent Color', domain)}
          name="aamd_cookies_accent_color"
          value={data.aamd_cookies_accent_color || '#ffffff'}
          onChange={onChangeHandler}
        />

        <ColorInput
          label={__('Background Color', domain)}
          name="aamd_cookies_background_color"
          value={data.aamd_cookies_background_color || '#ffffff'}
          onChange={onChangeHandler}
        />

        <label className="form-label" htmlFor="aamd_cookies_border_width">
          {__('Border Width', domain)}
          <input
            id="aamd_cookies_border_width"
            name="aamd_cookies_border_width"
            type="number"
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            value={data.aamd_cookies_border_width ?? 2}
            onChange={onChangeHandler}
          />
        </label>
      </div>
      <div>
        <RadioControl
          label={__('Align Cookie Prompt', domain)}
          name="aamd_cookies_align"
          selected={data.aamd_cookies_align}
          options={
            data.aamd_cookies_format === Format.Box
              ? [
                {
                  label: __('Bottom Left', domain),
                  value: Align.BottomLeft,
                },
                {
                  label: __('Bottom Right', domain),
                  value: Align.BottomRight,
                },
                {
                  label: __('Top Left', domain),
                  value: Align.TopLeft,
                },
                {
                  label: __('Top Right', domain),
                  value: Align.TopRight,
                },
              ]
              : [
                {
                  label: __('Bottom', domain),
                  value: Align.BottomLeft,
                }, {
                  label: __('Top', domain),
                  value: Align.TopLeft,
                },
              ]
          }
          onChange={(value) =>
          { setData((prev) => ({
            ...prev,
            aamd_cookies_align: value as Align,
          })) }
          }
        />
        <RadioControl
          label={__('Format of Cookie Prompt', domain)}
          name="aamd_cookies_format"
          selected={data.aamd_cookies_format}
          options={[
            {
              label: __('Box', domain),
              value: Format.Box,
            }, {
              label: __('Banner', domain),
              value: Format.Banner,
            },
          ]}
          onChange={(value) =>
          { setData((prev) => ({
            ...prev,
            aamd_cookies_format: value as Format,
          })) }
          }
        />
        <RadioControl
          label={__('Align Mini Cookie Prompt', domain)}
          name="aamd_cookies_align_mini"
          selected={`mini-${data.aamd_cookies_align_mini}`}
          options={[
            {
              label: __('Bottom Left', domain),
              value: `mini-${Align.BottomLeft}`,
            },
            {
              label: __('Bottom Right', domain),
              value: `mini-${Align.BottomRight}`,
            },
            {
              label: __('Top Left', domain),
              value: `mini-${Align.TopLeft}`,
            },
            {
              label: __('Top Right', domain),
              value: `mini-${Align.TopRight}`,
            },
          ]}
          onChange={(value) =>
          { setData((prev) => ({
            ...prev,
            aamd_cookies_align_mini: value.replace('mini-', '') as Align,
          })) }
          }
        />
      </div>
    </fieldset>
  )
}
