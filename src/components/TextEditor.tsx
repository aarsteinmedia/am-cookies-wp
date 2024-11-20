// import { useEffect, useRef, useState } from '@wordpress/element';
import { RichText } from '@wordpress/block-editor';
// import {
// 	create,
// 	toggleFormat,
// 	toHTMLString,
// 	type RichTextValue,
// } from '@wordpress/rich-text';
// import { Toolbar, ToolbarGroup, ToolbarButton } from '@wordpress/components';
// import { formatBold, formatItalic /* link */ } from '@wordpress/icons';

export default function TextEditor( {
	allowedFormats = [ 'core/bold', 'core/italic' ],
	id,
	label,
	name,
	value: initialValue,
	setValue,
}: {
	allowedFormats?: string[];
	id: string;
	label: string;
	name: string;
	value: string;
	setValue: ( val: string ) => void;
} ) {
	// const [ state, setState ] = useState< {
	// 		isActive: boolean;
	// 		element: Element | null;
	// 		html: string;
	// 		richText: null | RichTextValue;
	// 	} >( {
	// 		isActive: false,
	// 		element: null,
	// 		html: '',
	// 		richText: null,
	// 	} ),
	// 	container = useRef< HTMLLabelElement >( null ),
	// 	toggle = ( type: 'core/bold' | 'core/italic' ) => {
	// 		if ( ! state.richText ) {
	// 			return;
	// 		}
	// 		const value = toggleFormat( state.richText, {
	// 			type,
	// 		} );

	// 		setValue( toHTMLString( { value } ) );
	// 	};

	// useEffect( () => {
	// 	if ( ! state.isActive ) {
	// 		return;
	// 	}
	// 	setState( ( prev ) => {
	// 		if ( ! prev.element ) {
	// 			return prev;
	// 		}
	// 		const selection = getSelection(),
	// 			range = selection?.getRangeAt( 0 ),
	// 			richText = create( {
	// 				element: prev.element,
	// 				html: prev.html,
	// 				range,
	// 			} );
	// 		return { ...prev, richText };
	// 	} );
	// }, [ state.isActive ] );

	return (
		<label
			className="form-label"
			htmlFor={ id }
			// style={ { position: state.isActive ? 'relative' : 'initial' } }
			// onBlur={ ( { relatedTarget } ) => {
			// 	if ( ! container.current?.contains( relatedTarget ) ) {
			// 		setState( ( prev ) => ( { ...prev, isActive: false } ) );
			// 	}
			// } }
			// onFocus={ () => {
			// 	setState( ( prev ) => ( { ...prev, isActive: true } ) );
			// } }
			// ref={ container }
		>
			{ label }
			<RichText
				id={ id }
				name={ name }
				className="aamd_cookies_textarea"
				value={ initialValue }
				allowedFormats={ allowedFormats }
				key="editable"
				onChange={ setValue }
				tagName="p"
				// onFocus={ ( { target } ) => {
				// 	setState( ( prev ) => {
				// 		if (
				// 			! ( 'innerHTML' in target ) ||
				// 			typeof target.innerHTML !== 'string'
				// 		) {
				// 			return prev;
				// 		}
				// 		return {
				// 			...prev,
				// 			element: target as unknown as Element,
				// 			html: target.innerHTML,
				// 		};
				// 	} );
				// } }
			/>
			{ /* state.isActive && (
				<Toolbar label="Options">
					<ToolbarGroup>
						<ToolbarButton
							icon={ formatBold }
							label="Bold"
							onClick={ () => toggle( 'core/bold' ) }
						/>
						<ToolbarButton
							icon={ formatItalic }
							label="Italic"
							onClick={ () => toggle( 'core/italic' ) }
						/>
					</ToolbarGroup>
				</Toolbar>
			) */ }
		</label>
	);
}
