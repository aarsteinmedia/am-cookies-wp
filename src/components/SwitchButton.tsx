import {
  useId,
  useState,
} from '@wordpress/element'

interface Props {
  disabled?: boolean
  label?: string
  name: string
  value: boolean
}

export default function SwitchButton({
  disabled = false,
  label,
  name,
  value,
}: Props) {
  const id = useId(),
    [isChecked, setIsChecked] = useState(value)

  return (
    <div className="container">
      {label &&
        <label className="textLabel" htmlFor={id}>
          {label}
        </label>
      }
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control*/}
      <label className="label" htmlFor={id}>
        <input
          checked={isChecked}
          className="input"
          disabled={disabled}
          id={id}
          name={name}
          type="checkbox"
          onChange={() => { setIsChecked((prev) => !prev) }}
        />
        <span className="slider"></span>
      </label>
    </div>
  )
}