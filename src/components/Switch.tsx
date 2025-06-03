import { BaseControl, FormToggle } from '@wordpress/components'

export default function SwitchLabel({
  id = '',
  onChange,
  subTitle,
  title,
  value,
}: {
  id: string
  onChange: (x: boolean) => unknown
  subTitle?: string
  title?: string
  value?: boolean
}) {
  return (
    <BaseControl className={'am-switch-label'} help={subTitle} id={id}>
      <BaseControl.VisualLabel>{title}</BaseControl.VisualLabel>
      <FormToggle checked={value} onChange={() => onChange(!value)} />
    </BaseControl>
  )
}
