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
		<label className="form-label" htmlFor={ name }>
			{ label }
			<div
				style={ {
					display: 'flex',
					flexDirection: 'row',
					gap: '.5em',
					alignItems: 'center',
				} }
			>
				<ColorIndicator colorValue={ value as string } />
				<input
					id={ name }
					name={ name }
					value={ value }
					onChange={ onChange }
					type="text"
					onFocus={ () => setShowPicker( true ) }
					// type="color"
				/>
				{ showPicker && (
					<Popover onFocusOutside={ () => setShowPicker( false ) }>
						<ColorPicker
							color={ value as string }
							onChange={ ( color ) =>
								// eslint-disable-next-line @typescript-eslint/ban-ts-comment
								// @ts-ignore
								onChange( {
									target: { value: color, name },
								} as ChangeEvent< HTMLInputElement > )
							}
						/>
					</Popover>
				) }
			</div>
		</label>
	);
}
