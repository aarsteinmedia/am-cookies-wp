import { BaseControl, FormToggle } from '@wordpress/components'

interface Props {
  id: string
  onChange: (x: boolean) => unknown
  subTitle?: string
  title?: string
  value?: boolean
}

export default function SwitchLabel({
  id = '',
  onChange,
  subTitle,
  title,
  value,
}: Props) {
  return (
    <BaseControl className={'am-switch-label'} help={subTitle} id={id}>
      <BaseControl.VisualLabel>{title}</BaseControl.VisualLabel>
      <FormToggle checked={value} onChange={() => onChange(!value)} />
    </BaseControl>
  )
}
