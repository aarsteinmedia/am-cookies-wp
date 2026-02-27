import {
  ColorIndicator, ColorPicker, Popover
} from '@wordpress/components'
import { useState } from '@wordpress/element'

type Props = React.InputHTMLAttributes<HTMLInputElement> & { label: string }

export default function ColorInput({
  label,
  name,
  onChange,
  value,
}: Props) {
  if (!name || !label) {
    throw new Error('Missing name or label')
  }
  const [shouldShowPicker, setShouldShowPicker] = useState(false)

  return (
    <label
      className="form-label"
      htmlFor={name}
      onBlur={() => { setShouldShowPicker(false) }}
      onFocus={() => { setShouldShowPicker(true) }}
    >
      {label}
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'row',
          gap: '.5em',
        }}
      >
        <input
          id={name}
          name={name}
          type="text"
          value={value}
          onChange={onChange}
        />
        <ColorIndicator colorValue={value as string} />
        {shouldShowPicker &&
          <Popover>
            <ColorPicker
              color={value as string}
              onChange={(color) => {
                if (!onChange) {
                  return
                }
                onChange({
                  target: {
                    name,
                    value: color
                  },
                } as React.ChangeEvent<HTMLInputElement>)
              }}
            />
          </Popover>
        }
      </div>
    </label>
  )
}
