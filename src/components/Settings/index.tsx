import type { ChangeEvent, FormEvent } from 'react'

import apiFetch from '@wordpress/api-fetch'
import {
  useCallback, useEffect, useState
} from '@wordpress/element'
import { __ } from '@wordpress/i18n'

import type { Options, SettingsState } from '@/types'

import Loading from '@/components/Loading'
import Logo from '@/components/Logo'
import Preview from '@/components/Preview'
import Content from '@/components/Settings/Content'
import Layout from '@/components/Settings/Layout'
import Tracking from '@/components/Settings/Tracking'
import SwitchLabel from '@/components/Switch'
import { Align, Format } from '@/enums'
import getTranslation from '@/i18n'

const domain = 'am-cookies'

export default function Settings() {
  const [data, setData] = useState<Options>({
      aamd_cookies_accent_color: '#ffffff',
      aamd_cookies_align: Align.BottomLeft,
      aamd_cookies_align_mini: Align.BottomLeft,
      aamd_cookies_background_color: '#ffffff',
      aamd_cookies_border_width: 2,
      aamd_cookies_color: '#000000',
      aamd_cookies_font_family: 'sans-serif',
      aamd_cookies_format: Format.Box,
      aamd_cookies_google_id: null,
      aamd_cookies_meta_id: null,
      aamd_cookies_snap_id: null,
      aamd_cookies_text: getTranslation(),
      aamd_cookies_tiktok_id: null,
      aamd_cookies_wp_privacy_policy_url: 'privacy-policy',
    }),
    [state, setState] = useState<SettingsState>({
      activeInput: '',
      loading: false,
      preview: true,
      tab: 'tracking',
    }),
    getData = useCallback(async () => {
      const options = await apiFetch<Options>({ path: 'am-cookies-settings/v1/options' })

      setData((prev) => {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (!options.aamd_cookies_text) {
          return {
            ...options,
            aamd_cookies_text: prev.aamd_cookies_text,
          }
        }

        return options
      })
    }, []),
    onChangeHandler = ({ target }: ChangeEvent<HTMLInputElement>) => {
      setData((prev) => ({
        ...prev,
        [target.name]: target.value,
      }))
    },
    saveChanges = async (e: FormEvent) => {
      e.preventDefault()

      try {
        setState((prev) => ({
          ...prev,
          loading: true
        }))
        await apiFetch({
          data,
          method: 'POST',
          path: 'am-cookies-settings/v1/options',
        })
      } catch (error) {
        console.error(error)
      } finally {
        setTimeout(() => {
          setState((prev) => ({
            ...prev,
            loading: false,
          }))
        }, 400)
      }
    }

  useEffect(() => {
    void getData()
  }, [getData])

  return (
    <section className="aamd-cookies-settings">
      <div className="aamd-cookies-header-wrapper">
        <header>
          <span
            style={{
              alignItems: 'center',
              display: 'flex',
              gap: '.7em',
            }}
          >
            <Logo
              style={{
                height: '3em',
                width: '3em',
              }}
            />
            <h1 style={{ margin: '0' }}>
              {__('Cookies Settings', domain)}
            </h1>
          </span>
          <SwitchLabel
            id="toggle-preview"
            title={__('Toggle Preview', domain)}
            value={state.preview}
            onChange={() =>
            { setState((prev) => ({
              ...prev,
              preview: !prev.preview,
            })) }
            }
          />
        </header>
        <nav>
          <a
            data-active={state.tab === 'tracking'}
            href="/#tracking"
            onClick={(e) => {
              e.preventDefault()
              setState((prev) => ({
                ...prev,
                tab: 'tracking',
              }))
            }}
          >
            {__('Tracking', domain)}
          </a>
          <a
            data-active={state.tab === 'layout'}
            href="/#layout"
            onClick={(e) => {
              e.preventDefault()
              setState((prev) => ({
                ...prev,
                tab: 'layout',
              }))
            }}
          >
            {__('Layout', domain)}
          </a>
          <a
            data-active={state.tab === 'content'}
            href="/#content"
            onClick={(e) => {
              e.preventDefault()
              setState((prev) => ({
                ...prev,
                tab: 'content',
              }))
            }}
          >
            {__('Content', domain)}
          </a>
        </nav>
      </div>

      <main
        style={{ marginTop: '157px' }}
      >
        <div className="content">
          <form
            className="aamd-cookies-form"
            onSubmit={(e) => void saveChanges(e)}
          >
            <Tracking
              data={data}
              setState={setState}
              state={state}
              onChangeHandler={onChangeHandler}
            />
            <Layout
              data={data}
              setData={setData}
              state={state}
              onChangeHandler={onChangeHandler}
            />
            <Content
              data={data}
              setData={setData}
              setState={setState}
              state={state}
              onChangeHandler={onChangeHandler}
            />
            <button className="am-btn blue" type="submit">
              {state.loading ? <Loading /> : __('Save', domain)}
            </button>
          </form>
        </div>
      </main>
      {state.preview && <Preview data={data} />}
    </section>
  )
}
