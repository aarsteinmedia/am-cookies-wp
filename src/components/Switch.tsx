import { BaseControl, FormToggle } from '@wordpress/components';

export default function SwitchLabel( {
	id = '',
	onChange,
	subTitle,
	title,
	value,
}: {
	id: string;
	onChange: ( x: boolean ) => unknown;
	subTitle?: string;
	title?: string;
	value?: boolean;
} ) {
	return (
		<BaseControl
			id={ id }
			help={ subTitle }
			className={ 'am-switch-label' }
		>
			<BaseControl.VisualLabel>{ title }</BaseControl.VisualLabel>
			<FormToggle
				checked={ value }
				onChange={ () => onChange( ! value ) }
			/>
		</BaseControl>
	);
}
