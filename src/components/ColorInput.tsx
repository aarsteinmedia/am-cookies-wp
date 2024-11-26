import type { ChangeEvent, InputHTMLAttributes } from 'react';

import { ColorIndicator, ColorPicker, Popover } from '@wordpress/components';
import { useState } from '@wordpress/element';

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
			onBlur={ () => setShowPicker( false ) }
			onFocus={ () => setShowPicker( true ) }
		>
			{ label }
			<div
				style={ {
					alignItems: 'center',
					display: 'flex',
					flexDirection: 'row',
					gap: '.5em',
				} }
			>
				<input
					id={ name }
					name={ name }
					onChange={ onChange }
					type="text"
					value={ value }
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
									target: { name, value: color },
								} as ChangeEvent< HTMLInputElement > );
							} }
						/>
					</Popover>
				) }
			</div>
		</label>
	);
}
