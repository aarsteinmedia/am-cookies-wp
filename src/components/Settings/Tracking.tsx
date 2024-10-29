import { __ } from '@wordpress/i18n';
import type { Options, SettingsState } from '@/types';

export default function Tracking({
  data,
  onChangeHandler,
  state,
  setState,
}: Readonly<{
  data: Options
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
  state: SettingsState
  setState: React.Dispatch<React.SetStateAction<SettingsState>>
}>) {
  return (
    <fieldset
      id="tracking"
      hidden={state.tab !== 'tracking'}
      className="aamd-cookies-fieldset"
    >
      <div>
        <label
          className="form-label"
          htmlFor="aamd_cookies_google_id"
        >
          {__('Google Tracking ID', 'am-cookies')}

          <input
            id="aamd_cookies_google_id"
            name="aamd_cookies_google_id"
            value={
              data.aamd_cookies_google_id || ''
            }
            onChange={onChangeHandler}
            type="text"
            onFocus={() =>
              setState((prev) => ({
                ...prev,
                activeInput:
                  'aamd_cookies_google_id',
              }))
            }
            onBlur={() =>
              setState((prev) => ({
                ...prev,
                activeInput: '',
              }))
            }
          // placeholder="G-XXXXXXXXXX / GTM-XXXXXXXXXX"
          />
        </label>

        <label
          className="form-label"
          htmlFor="aamd_cookies_meta_id"
        >
          {__(
            'Meta/Facebook Pixel ID',
            'am-cookies'
          )}

          <input
            id="aamd_cookies_meta_id"
            name="aamd_cookies_meta_id"
            value={
              data.aamd_cookies_meta_id || ''
            }
            onChange={onChangeHandler}
            type="text"
            disabled={data.aamd_cookies_google_id?.startsWith(
              'GTM-'
            )}
            onFocus={() =>
              setState((prev) => ({
                ...prev,
                activeInput:
                  'aamd_cookies_meta_id',
              }))
            }
            onBlur={() =>
              setState((prev) => ({
                ...prev,
                activeInput: '',
              }))
            }
          // placeholder="000000000000000"
          />
        </label>
        <label
          className="form-label"
          htmlFor="aamd_cookies_snap_id"
        >
          {__('SnapChat Pixel ID', 'am-cookies')}

          <input
            id="aamd_cookies_snap_id"
            name="aamd_cookies_snap_id"
            value={
              data.aamd_cookies_snap_id || ''
            }
            onChange={onChangeHandler}
            type="text"
            disabled={data.aamd_cookies_google_id?.startsWith(
              'GTM-'
            )}
            onFocus={() =>
              setState((prev) => ({
                ...prev,
                activeInput:
                  'aamd_cookies_snap_id',
              }))
            }
            onBlur={() =>
              setState((prev) => ({
                ...prev,
                activeInput: '',
              }))
            }
          // placeholder="11a1111a-1a1a-111a-1a11-aa1aa111a1aa"
          />
        </label>

        <label
          className="form-label"
          htmlFor="aamd_cookies_tiktok_id"
        >
          {__('TikTok ID', 'am-cookies')}
          <input
            id="aamd_cookies_tiktok_id"
            name="aamd_cookies_tiktok_id"
            value={
              data.aamd_cookies_tiktok_id || ''
            }
            onChange={onChangeHandler}
            type="text"
            disabled={data.aamd_cookies_google_id?.startsWith(
              'GTM-'
            )}
            onFocus={() =>
              setState((prev) => ({
                ...prev,
                activeInput:
                  'aamd_cookies_tiktok_id',
              }))
            }
            onBlur={() =>
              setState((prev) => ({
                ...prev,
                activeInput: '',
              }))
            }
          // placeholder="A1AAA1AA1AAA1AAAAA1AA"
          />
        </label>
      </div>
      <div>
        <h3
          className="fade-in"
          style={{
            marginTop: '0',
          }}
          hidden={
            state.activeInput !==
            'aamd_cookies_google_id'
          }
        >
          {__('Instructions', 'am-cookies')}
        </h3>
        <div
          className="info"
          hidden={
            state.activeInput !==
            'aamd_cookies_google_id'
          }
        >
          <p>
            {__(
              'Enter GA4 tag ID or Tag Manager ID.',
              'am-cookies'
            )}
          </p>
          <p>
            {__(
              "If you've already installed Analytics or Tag Manager on your page, please remove it. This plugin adds either Google Analytics or Google Tag Manager, depending on which Google tracking ID you enter. If you use Google Tag Manager, we reccomend you implement other tags, i. e. MetaPixel through that.",
              'am-cookies'
            )}
          </p>
        </div>
      </div>
    </fieldset>
  )
}