import { __ } from '@wordpress/i18n'

import type { Options, SettingsState } from '@/types'

import TextEditor from '@/components/TextEditor'
import { domain } from '@/enums'

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
        <h3 style={{ marginTop: '0' }}>{__('Cookie Prompt', domain)}</h3>
        <label className="form-label" htmlFor="aamd_cookies_text_header">
          {__('Header', domain)}
          <input
            id="aamd_cookies_text_header"
            name="aamd_cookies_text"
            type="text"
            value={data.aamd_cookies_text.header}
            onChange={({ target: { value } }) =>
            { setData((prev) => ({
              ...prev,
              aamd_cookies_text: {
                ...prev.aamd_cookies_text,
                header: value,
              },
            })) }
            }
          />
        </label>

        <label className="form-label" htmlFor="aamd_cookies_text_accept">
          {__('Accept-button', domain)}
          <input
            id="aamd_cookies_text_accept"
            name="aamd_cookies_text"
            type="text"
            value={data.aamd_cookies_text.accept}
            onChange={({ target: { value } }) =>
            { setData((prev) => ({
              ...prev,
              aamd_cookies_text: {
                ...prev.aamd_cookies_text,
                accept: value,
              },
            })) }
            }
          />
        </label>
        <label
          className="form-label"
          htmlFor="aamd_cookies_text_customize_label"
        >
          {__('Customize-button', domain)}
          <input
            id="aamd_cookies_text_customize_label"
            name="aamd_cookies_text"
            type="text"
            value={data.aamd_cookies_text.customize.label}
            onChange={({ target: { value } }) =>
            { setData((prev) => ({
              ...prev,
              aamd_cookies_text: {
                ...prev.aamd_cookies_text,
                customize: {
                  ...prev.aamd_cookies_text.customize,
                  label: value,
                },
              },
            })) }
            }
          />
        </label>
        <h3>{__('Mini-Cookie Prompt', domain)}</h3>
        <label className="form-label" htmlFor="aamd_cookies_text_miniGDPR">
          {__('Aria-label', domain)}
          <input
            id="aamd_cookies_text_miniGDPR"
            name="aamd_cookies_text"
            type="text"
            value={data.aamd_cookies_text.miniGDPR}
            onChange={({ target: { value } }) =>
            { setData((prev) => ({
              ...prev,
              aamd_cookies_text: {
                ...prev.aamd_cookies_text,
                miniGDPR: value,
              },
            })) }
            }
          />
        </label>
      </div>
      <div>
        <h3 style={{ marginTop: '0' }}>
          {__('Customize settings', domain)}
        </h3>
        <label
          className="form-label"
          htmlFor="aamd_cookies_text_customize_header"
        >
          {__('Header', domain)}
          <input
            id="aamd_cookies_text_customize_header"
            name="aamd_cookies_text"
            type="text"
            value={data.aamd_cookies_text.customize.header}
            onChange={({ target: { value } }) =>
            { setData((prev) => ({
              ...prev,
              aamd_cookies_text: {
                ...prev.aamd_cookies_text,
                customize: {
                  ...prev.aamd_cookies_text.customize,
                  header: value,
                },
              },
            })) }
            }
          />
        </label>

        <TextEditor
          id="aamd_cookies_text_customize_text"
          label={__('Main description', domain)}
          name="aamd_cookies_text"
          value={data.aamd_cookies_text.customize.text}
          setValue={(value) =>
          { setData((prev) => ({
            ...prev,
            aamd_cookies_text: {
              ...prev.aamd_cookies_text,
              customize: {
                ...prev.aamd_cookies_text.customize,
                text: value,
              },
            },
          })) }
          }
        />

        <TextEditor
          id="aamd_cookies_text_customize_retargeting"
          label={__('Retargeting description', domain)}
          name="aamd_cookies_text"
          value={data.aamd_cookies_text.customize.retargeting}
          setValue={(value) =>
          { setData((prev) => ({
            ...prev,
            aamd_cookies_text: {
              ...prev.aamd_cookies_text,
              customize: {
                ...prev.aamd_cookies_text.customize,
                retargeting: value,
              },
            },
          })) }
          }
        />

        <label
          className="form-label"
          htmlFor="aamd_cookies_wp_privacy_policy_url"
        >
          {__('Privacy Policy URL', domain)}
          <input
            id="aamd_cookies_wp_privacy_policy_url"
            name="aamd_cookies_wp_privacy_policy_url"
            type="text"
            value={data.aamd_cookies_wp_privacy_policy_url || ''}
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
              activeInput: 'aamd_cookies_wp_privacy_policy_url',
            })) }
            }
          />
        </label>

        <TextEditor
          id="aamd_cookies_text_customize_link"
          label={__('Privacy link description', domain)}
          name="aamd_cookies_text"
          value={data.aamd_cookies_text.customize.link}
          setValue={(value) =>
          { setData((prev) => ({
            ...prev,
            aamd_cookies_text: {
              ...prev.aamd_cookies_text,
              customize: {
                ...prev.aamd_cookies_text.customize,
                link: value,
              },
            },
          })) }
          }
        />

        <label className="form-label" htmlFor="aamd_cookies_text_decline">
          {__('Decline-button', domain)}
          <input
            id="aamd_cookies_text_decline"
            name="aamd_cookies_text"
            type="text"
            value={data.aamd_cookies_text.decline}
            onChange={({ target: { value } }) =>
            { setData((prev) => ({
              ...prev,
              aamd_cookies_text: {
                ...prev.aamd_cookies_text,
                decline: value,
              },
            })) }
            }
          />
        </label>

        <label className="form-label" htmlFor="aamd_cookies_text_accept_all">
          {__('Accept all-button', domain)}
          <input
            id="aamd_cookies_text_accept_all"
            name="aamd_cookies_text"
            type="text"
            value={data.aamd_cookies_text.acceptAll}
            onChange={({ target: { value } }) =>
            { setData((prev) => ({
              ...prev,
              aamd_cookies_text: {
                ...prev.aamd_cookies_text,
                acceptAll: value,
              },
            })) }
            }
          />
        </label>
      </div>
    </fieldset>
  )
}
