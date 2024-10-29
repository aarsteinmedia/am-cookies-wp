import { __ } from '@wordpress/i18n';
import { RadioControl } from '@wordpress/components';
import ColorInput from '@/components/ColorInput';
import type { Options, SettingsState } from '@/types';
import { Align, Format } from '@/enums';

export default function Layout({
  data,
  setData,
  onChangeHandler,
  state,
}: Readonly<{
  data: Options
  setData: React.Dispatch<React.SetStateAction<Options>>
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
  state: SettingsState
}>) {
  return (
    <fieldset
      id="layout"
      hidden={state.tab !== 'layout'}
      className="aamd-cookies-fieldset"
    >
      <div>
        <label
          className="form-label"
          htmlFor="aamd_cookies_font_family"
        >
          {__('Font Family', 'am-cookies')}
          <input
            id="aamd_cookies_font_family"
            name="aamd_cookies_font_family"
            value={data.aamd_cookies_font_family}
            placeholder="sans-serif"
            onChange={onChangeHandler}
            type="text"
          />
        </label>

        <ColorInput
          label={__('Color', 'am-cookies')}
          name="aamd_cookies_color"
          value={
            data.aamd_cookies_color || '#000000'
          }
          onChange={onChangeHandler}
        />

        <ColorInput
          label={__('Accent Color', 'am-cookies')}
          name="aamd_cookies_accent_color"
          value={
            data.aamd_cookies_accent_color ||
            '#ffffff'
          }
          onChange={onChangeHandler}
        />

        <ColorInput
          label={__(
            'Background Color',
            'am-cookies'
          )}
          name="aamd_cookies_background_color"
          value={
            data.aamd_cookies_background_color ||
            '#ffffff'
          }
          onChange={onChangeHandler}
        />

        <label
          className="form-label"
          htmlFor="aamd_cookies_border_width"
        >
          {__('Border Width', 'am-cookies')}
          <input
            id="aamd_cookies_border_width"
            name="aamd_cookies_border_width"
            value={
              data.aamd_cookies_border_width ?? 2
            }
            onChange={onChangeHandler}
            type="number"
          />
        </label>
      </div>
      <div>
        <RadioControl
          selected={data.aamd_cookies_align}
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
          label={__(
            'Align Cookie Prompt',
            'am-cookies'
          )}
        />
        <RadioControl
          selected={data.aamd_cookies_format}
          onChange={(value) =>
            setData((prev) => ({
              ...prev,
              aamd_cookies_format:
                value as Format,
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
          name="aamd_cookies_format"
          label={__(
            'Format of Cookie Prompt',
            'am-cookies'
          )}
        />
        <RadioControl
          selected={`mini-${data.aamd_cookies_align_mini}`}
          onChange={(value) =>
            setData((prev) => ({
              ...prev,
              aamd_cookies_align_mini:
                value.replace(
                  'mini-',
                  ''
                ) as Align,
            }))
          }
          options={[
            {
              label: __(
                'Bottom Left',
                'am-cookies'
              ),
              value: `mini-${Align.BottomLeft}`,
            },
            {
              label: __(
                'Bottom Right',
                'am-cookies'
              ),
              value: `mini-${Align.BottomRight}`,
            },
            {
              label: __(
                'Top Left',
                'am-cookies'
              ),
              value: `mini-${Align.TopLeft}`,
            },
            {
              label: __(
                'Top Right',
                'am-cookies'
              ),
              value: `mini-${Align.TopRight}`,
            },
          ]}
          name="aamd_cookies_align_mini"
          label={__(
            'Align Mini Cookie Prompt',
            'am-cookies'
          )}
        />
      </div>
    </fieldset>
  )
}