import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';
import type { Options, SettingsState } from '@/types';

export default function Content({
  data,
  setData,
  onChangeHandler,
  state,
  setState,
}: Readonly<{
  data: Options
  setData: React.Dispatch<React.SetStateAction<Options>>
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
  state: SettingsState
  setState: React.Dispatch<React.SetStateAction<SettingsState>>
}>) {
  return (
    <fieldset
      id="content"
      hidden={state.tab !== 'content'}
      className="aamd-cookies-fieldset"
    >
      <div>
        <h3 style={{ marginTop: '0' }}>
          {__('Cookie Prompt', 'am-cookies')}
        </h3>
        <label
          className="form-label"
          htmlFor="aamd_cookies_text_header"
        >
          {__('Header', 'am-cookies')}
          <input
            id="aamd_cookies_text_header"
            name="aamd_cookies_text"
            value={data.aamd_cookies_text.header}
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
          />
        </label>

        <label
          className="form-label"
          htmlFor="aamd_cookies_text_accept"
        >
          {__('Accept-button', 'am-cookies')}
          <input
            id="aamd_cookies_text_accept"
            name="aamd_cookies_text"
            value={data.aamd_cookies_text.accept}
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
            value={
              data.aamd_cookies_text.customize
                .label
            }
            onChange={({ target: { value } }) =>
              setData((prev) => ({
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
              }))
            }
            type="text"
          />
        </label>
        <h3>
          {__('Mini-Cookie Prompt', 'am-cookies')}
        </h3>
        <label
          className="form-label"
          htmlFor="aamd_cookies_text_miniGDPR"
        >
          {__('Aria-label', 'am-cookies')}
          <input
            id="aamd_cookies_text_miniGDPR"
            name="aamd_cookies_text"
            value={
              data.aamd_cookies_text.miniGDPR
            }
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
            value={
              data.aamd_cookies_text.customize
                .header
            }
            onChange={({ target: { value } }) =>
              setData((prev) => ({
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
              }))
            }
            type="text"
          />
        </label>

        <label
          className="form-label"
          htmlFor="aamd_cookies_text_customize_text"
        >
          {__('Main description', 'am-cookies')}
          <RichText
            id="aamd_cookies_text_customize_text"
            name="aamd_cookies_text"
            className="aamd_cookies_textarea"
            value={
              data.aamd_cookies_text.customize
                .text
            }
            allowedFormats={[
              'core/bold',
              'core/italic',
            ]}
            onChange={(value) =>
              setData((prev) => ({
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
              }))
            }
          />
        </label>

        <label
          className="form-label"
          htmlFor="aamd_cookies_text_customize_retargeting"
        >
          {__(
            'Retargeting description',
            'am-cookies'
          )}
          <RichText
            id="aamd_cookies_text_customize_retargeting"
            name="aamd_cookies_text"
            className="aamd_cookies_textarea"
            value={
              data.aamd_cookies_text.customize
                .retargeting
            }
            allowedFormats={[
              'core/bold',
              'core/italic',
            ]}
            onChange={(value) =>
              setData((prev) => ({
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
              }))
            }
          />
        </label>

        <label
          className="form-label"
          htmlFor="aamd_cookies_wp_privacy_policy_url"
        >
          {__('Privacy Policy URL', 'am-cookies')}
          <input
            id="aamd_cookies_wp_privacy_policy_url"
            name="aamd_cookies_wp_privacy_policy_url"
            value={
              data.aamd_cookies_wp_privacy_policy_url ||
              ''
            }
            onChange={onChangeHandler}
            onFocus={() =>
              setState((prev) => ({
                ...prev,
                activeInput:
                  'aamd_cookies_wp_privacy_policy_url',
              }))
            }
            onBlur={() =>
              setState((prev) => ({
                ...prev,
                activeInput: '',
              }))
            }
            type="text"
          />
        </label>

        <label
          className="form-label"
          htmlFor="aamd_cookies_text_customize_link"
        >
          {__(
            'Privacy link description',
            'am-cookies'
          )}
          <RichText
            id="aamd_cookies_text_customize_link"
            name="aamd_cookies_text"
            className="aamd_cookies_textarea"
            value={
              data.aamd_cookies_text.customize
                .link
            }
            allowedFormats={[
              'core/bold',
              'core/italic',
              'core/link',
            ]}
            onChange={(value) =>
              setData((prev) => ({
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
              }))
            }
          />
        </label>

        <label
          className="form-label"
          htmlFor="aamd_cookies_text_decline"
        >
          {__('Decline-button', 'am-cookies')}
          <input
            id="aamd_cookies_text_decline"
            name="aamd_cookies_text"
            value={data.aamd_cookies_text.decline}
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
          />
        </label>

        <label
          className="form-label"
          htmlFor="aamd_cookies_text_accept_all"
        >
          {__('Accept all-button', 'am-cookies')}
          <input
            id="aamd_cookies_text_accept_all"
            name="aamd_cookies_text"
            value={
              data.aamd_cookies_text.acceptAll
            }
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
          />
        </label>
      </div>
    </fieldset>
  )
}