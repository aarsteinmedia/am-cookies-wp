import type { RichTextValue } from '@wordpress/rich-text'

import { RichText } from '@wordpress/block-editor'
import {
  Toolbar, ToolbarGroup, ToolbarButton
} from '@wordpress/components'
import { useRef, useState } from '@wordpress/element'
import { formatBold, formatItalic } from '@wordpress/icons'
import classNames from 'classnames'

const coreItalic = 'core/italic'

interface Props {
  allowedFormats?: string[]
  id: string
  label: string
  name: string
  setValue: (val: string) => void
  value: string
}

export default function TextEditor({
  allowedFormats = ['core/bold', coreItalic],
  id,
  label,
  name,
  setValue,
  value: initialValue,
}: Props) {
  const [state, setState] = useState<{
      isActive: boolean
      isBold: boolean
      isItalic: boolean
      element: Element | null
      html: string
      richText: null | RichTextValue
    }>({
      element: null,
      html: '',
      isActive: false,
      isBold: false,
      isItalic: false,
      richText: null,
    }),
    container = useRef<HTMLLabelElement>(null),
    paragaph = useRef<HTMLParagraphElement>(null),
    toggle = (type: 'core/bold' | typeof coreItalic) => {
      switch (type) {
        case 'core/bold': {
          setState((prev) => ({
            ...prev,
            isBold: !prev.isBold,
          }))
          break
        }
        case coreItalic: {
          setState((prev) => ({
            ...prev,
            isItalic: !prev.isItalic,
          }))
        }
      }

      if (!paragaph.current) {
        return
      }

      const content = paragaph.current.cloneNode(true)

      if (!(content instanceof HTMLElement)) {
        return
      }
      const activeElement: null | HTMLElement = content.querySelector('[data-rich-text-format-boundary="true"]')

      paragaph.current.focus()

      const tagName = type === 'core/bold' ? 'strong' : 'em'

      if ((state.isBold || state.isItalic) && activeElement) {
        const { innerHTML, parentElement } = activeElement

        if (activeElement.tagName.toLowerCase() === tagName) {
          activeElement.insertAdjacentHTML('beforebegin', innerHTML)
          parentElement?.removeChild(activeElement)
        } else {
          activeElement.innerHTML = `<${tagName}>${innerHTML}</${tagName}>`
        }

        setValue(content.innerHTML)

        return
      }

      const selection = getSelection()

      if (!selection || selection.isCollapsed) {
        // if ( selection ) {
        // 	const { anchorOffset: caretPosition } = selection,
        // 		{ innerHTML: oldText } = content,
        // 		newHTML = `${ oldText
        // 			.substring( 0, caretPosition )
        // 			.trim() } <${ tagName }></${ tagName }> ${ oldText
        // 			.substring( caretPosition )
        // 			.trim() }`;

        // 	console.log( newHTML );

        // 	// setValue( newHTML );
        // 	return;
        // }
        setValue(content.innerHTML)

        return
      }

      const {
        anchorOffset, direction, focusOffset
      } = selection
      let start = anchorOffset,
        end = focusOffset

      if (
        'direction' in selection &&
        typeof direction === 'string' &&
        direction === 'backward'
      ) {
        start = focusOffset
        end = anchorOffset
      }
      const { innerHTML: oldText } = content,
        newHTML = `${oldText.slice(0, Math.max(0, start)).trim()} <${tagName}>${oldText
          .slice(start, end)
          .trim()}</${tagName}> ${oldText.slice(Math.max(0, end)).trim()}`

      content.innerHTML = newHTML

      // eslint-disable-next-line unicorn/consistent-destructuring
      setValue(content.innerHTML)

      // const textNode = document.createTextNode( content.innerHTML ),
      // 	range = document.createRange();
      // range.setStart( textNode, start );
      // range.collapse( true );
      // selection.removeAllRanges();
      // selection.addRange( range );
    }

  return (
    <label
      className="form-label"
      htmlFor={id}
      ref={container}
      style={{ position: state.isActive ? 'relative' : 'initial' }}
      onBlur={({ relatedTarget }) => {
        if (!container.current?.contains(relatedTarget)) {
          setState((prev) => ({
            ...prev,
            isActive: false
          }))
        }
      }}
      onFocus={() => {
        setState((prev) => ({
          ...prev,
          isActive: true
        }))
      }}
    >
      {label}
      <RichText
        inlineToolbar
        allowedFormats={allowedFormats}
        className={classNames('aamd_cookies_textarea', { 'is-selected': state.isActive })}
        data-empty={initialValue.length === 0}
        data-title="Paragraph"
        id={id}
        key="editable"
        name={name}
        ref={paragaph as unknown as React.LegacyRef<'p'>}
        tagName="p"
        type="core/paragraph"
        value={initialValue}
        onChange={setValue}
        onClick={({ target }) => {
          if (!(target instanceof HTMLElement)) {
            return
          }
          if (target.dataset.richTextFormatBoundary === 'true') {
            if (
              target.tagName.toLowerCase() === 'strong' ||
              target.parentElement?.tagName.toLowerCase() === 'strong'
            ) {
              setState((prev) => ({
                ...prev,
                isBold: true,
              }))
            }

            if (
              target.tagName.toLowerCase() === 'em' ||
              target.parentElement?.tagName.toLowerCase() === 'em'
            ) {
              setState((prev) => ({
                ...prev,
                isItalic: true,
              }))
            }

            return
          }
          setState((prev) => ({
            ...prev,
            isBold: false,
            isItalic: false,
          }))
        }}
      />
      {state.isActive &&
        <Toolbar label="Options">
          <ToolbarGroup>
            <ToolbarButton
              icon={formatBold}
              isActive={state.isBold}
              label="Bold"
              onClick={() => {
                toggle('core/bold')
              }}
            />
            <ToolbarButton
              icon={formatItalic}
              isActive={state.isItalic}
              label="Italic"
              onClick={() => { toggle(coreItalic) }}
            />
          </ToolbarGroup>
        </Toolbar>
      }
    </label>
  )
}
