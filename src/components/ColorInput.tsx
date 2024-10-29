import { useState } from '@wordpress/element';
import { ColorIndicator, ColorPicker, Popover } from '@wordpress/components';
import type { ChangeEvent, InputHTMLAttributes } from 'react';

export default function ColorInput( {
	label,
	name,
	onChange,
	value,
}: InputHTMLAttributes< HTMLInputElement > & { label: string } ) {
	if ( ! name || ! label ) {
		throw new Error( 'Missing name or label' );
	}
	const [ showPicker, setShowPicker ] = useState( false );
	return (
		<label
			className="form-label"
			htmlFor={ name }
			onFocus={ () => setShowPicker( true ) }
			onBlur={ () => setShowPicker( false ) }
		>
			{ label }
			<div
				style={ {
					display: 'flex',
					flexDirection: 'row',
					gap: '.5em',
					alignItems: 'center',
				} }
			>
				<input
					id={ name }
					name={ name }
					value={ value }
					onChange={ onChange }
					type="text"
				/>
				<ColorIndicator colorValue={ value as string } />
				{ showPicker && (
					<Popover>
						<ColorPicker
							color={ value as string }
							onChange={ ( color ) => {
								if ( ! onChange ) {
									return;
								}
								onChange( {
									target: { value: color, name },
								} as ChangeEvent< HTMLInputElement > );
							} }
						/>
					</Popover>
				) }
			</div>
		</label>
	);
}
