import { __ } from '@wordpress/i18n'

import type { Options, SettingsState } from '@/types'

const domain = 'am-cookies'

export default function Tracking({
  data,
  onChangeHandler,
  setState,
  state,
}: Readonly<{
  data: Options
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
  state: SettingsState
  setState: React.Dispatch<React.SetStateAction<SettingsState>>
}>) {
  return (
    <fieldset
      className="aamd-cookies-fieldset"
      hidden={state.tab !== 'tracking'}
      id="tracking"
    >
      <div>
        <label className="form-label" htmlFor="aamd_cookies_google_id">
          {__('Google Tracking ID', domain)}

          <input
            id="aamd_cookies_google_id"
            name="aamd_cookies_google_id"
            type="text"
            value={data.aamd_cookies_google_id || ''}
            onChange={onChangeHandler}
            onBlur={() => {
              setState((prev) => ({
                ...prev,
                activeInput: '',
              }))
            }
            }
            onFocus={() => {
              setState((prev) => ({
                ...prev,
                activeInput: 'aamd_cookies_google_id',
              }))
            }
            }

            // placeholder="G-XXXXXXXXXX / GTM-XXXXXXXXXX"
          />
        </label>

        <label className="form-label" htmlFor="aamd_cookies_meta_id">
          {__('Meta/Facebook Pixel ID', domain)}

          <input
            disabled={data.aamd_cookies_google_id?.startsWith('GTM-')}
            id="aamd_cookies_meta_id"
            name="aamd_cookies_meta_id"
            type="text"
            value={data.aamd_cookies_meta_id || ''}
            onChange={onChangeHandler}
            onBlur={() =>
            { setState((prev) => ({
              ...prev,
              activeInput: '',
            })) }
            }
            onFocus={() =>
            { setState((prev) => ({
              ...prev,
              activeInput: 'aamd_cookies_meta_id',
            })) }
            }
          />
        </label>
        <label className="form-label" htmlFor="aamd_cookies_snap_id">
          {__('SnapChat Pixel ID', domain)}

          <input
            disabled={data.aamd_cookies_google_id?.startsWith('GTM-')}
            id="aamd_cookies_snap_id"
            name="aamd_cookies_snap_id"
            type="text"
            value={data.aamd_cookies_snap_id || ''}
            onChange={onChangeHandler}
            onBlur={() =>
            { setState((prev) => ({
              ...prev,
              activeInput: '',
            })) }
            }
            onFocus={() =>
            { setState((prev) => ({
              ...prev,
              activeInput: 'aamd_cookies_snap_id',
            })) }
            }
          />
        </label>

        <label className="form-label" htmlFor="aamd_cookies_tiktok_id">
          {__('TikTok ID', domain)}
          <input
            disabled={data.aamd_cookies_google_id?.startsWith('GTM-')}
            id="aamd_cookies_tiktok_id"
            name="aamd_cookies_tiktok_id"
            type="text"
            value={data.aamd_cookies_tiktok_id || ''}
            onChange={onChangeHandler}
            onBlur={() =>
            { setState((prev) => ({
              ...prev,
              activeInput: '',
            })) }
            }
            onFocus={() =>
            { setState((prev) => ({
              ...prev,
              activeInput: 'aamd_cookies_tiktok_id',
            })) }
            }
          />
        </label>
      </div>
      <div>
        <h3
          className="fade-in"
          hidden={state.activeInput !== 'aamd_cookies_google_id'}
          style={{ marginTop: '0' }}
        >
          {__('Instructions', domain)}
        </h3>
        <div
          className="info"
          hidden={state.activeInput !== 'aamd_cookies_google_id'}
        >
          <p>{__('Enter GA4 tag ID or Tag Manager ID.', domain)}</p>
          <p>
            {__('If you\'ve already installed Analytics or Tag Manager on your page, please remove it. This plugin adds either Google Analytics or Google Tag Manager, depending on which Google tracking ID you enter. If you use Google Tag Manager, we reccomend you implement other tags, i. e. MetaPixel through that.',
              domain)}
          </p>
        </div>
      </div>
    </fieldset>
  )
}
