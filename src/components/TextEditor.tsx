import type { RichTextValue } from '@wordpress/rich-text';

// import Cursor from '@/utils/Cursor';
import { RichText } from '@wordpress/block-editor';
import { Toolbar, ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { useRef, useState } from '@wordpress/element';
import { formatBold, formatItalic } from '@wordpress/icons';
import classNames from 'classnames';

export default function TextEditor( {
	allowedFormats = [ 'core/bold', 'core/italic' ],
	id,
	label,
	name,
	setValue,
	value: initialValue,
}: {
	allowedFormats?: string[];
	id: string;
	label: string;
	name: string;
	value: string;
	setValue: ( val: string ) => void;
} ) {
	const [ state, setState ] = useState< {
			isActive: boolean;
			isBold: boolean;
			isItalic: boolean;
			element: Element | null;
			html: string;
			richText: null | RichTextValue;
		} >( {
			element: null,
			html: '',
			isActive: false,
			isBold: false,
			isItalic: false,
			richText: null,
		} ),
		container = useRef< HTMLLabelElement >( null ),
		paragaph = useRef< HTMLParagraphElement >( null ),
		toggle = ( type: 'core/bold' | 'core/italic' ) => {
			switch ( type ) {
				case 'core/bold':
					setState( ( prev ) => ( {
						...prev,
						isBold: ! prev.isBold,
					} ) );
					break;
				case 'core/italic':
					setState( ( prev ) => ( {
						...prev,
						isItalic: ! prev.isItalic,
					} ) );
			}

			if ( ! paragaph.current ) {
				return;
			}

			const content = paragaph.current.cloneNode( true );
			if ( ! ( content instanceof HTMLElement ) ) {
				return;
			}
			const activeElement = content.querySelector(
				'[data-rich-text-format-boundary="true"]'
			);

			paragaph.current.focus();

			const tagName = type === 'core/bold' ? 'strong' : 'em';

			if ( ( state.isBold || state.isItalic ) && activeElement ) {
				const { innerHTML } = activeElement;
				if ( activeElement?.tagName.toLowerCase() === tagName ) {
					activeElement.insertAdjacentHTML(
						'beforebegin',
						innerHTML
					);
					activeElement.parentElement?.removeChild( activeElement );
				} else {
					activeElement.innerHTML = `<${ tagName }>${ innerHTML }</${ tagName }>`;
				}

				setValue( content.innerHTML );
				return;
			}

			const selection = getSelection();

			if ( ! selection || selection.isCollapsed ) {
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
				setValue( content.innerHTML );
				return;
			}

			const { anchorOffset, focusOffset } = selection;
			let start = anchorOffset,
				end = focusOffset;
			if (
				'direction' in selection &&
				typeof selection.direction === 'string' &&
				selection.direction === 'backward'
			) {
				start = focusOffset;
				end = anchorOffset;
			}
			const { innerHTML: oldText } = content,
				newHTML = `${ oldText
					.substring( 0, start )
					.trim() } <${ tagName }>${ oldText
					.substring( start, end )
					.trim() }</${ tagName }> ${ oldText
					.substring( end )
					.trim() }`;

			content.innerHTML = newHTML;

			setValue( content.innerHTML );

			// const textNode = document.createTextNode( content.innerHTML ),
			// 	range = document.createRange();
			// range.setStart( textNode, start );
			// range.collapse( true );
			// selection.removeAllRanges();
			// selection.addRange( range );
		};

	return (
		<label
			className="form-label"
			htmlFor={ id }
			onBlur={ ( { relatedTarget } ) => {
				if ( ! container.current?.contains( relatedTarget ) ) {
					setState( ( prev ) => ( { ...prev, isActive: false } ) );
				}
			} }
			onFocus={ () => {
				setState( ( prev ) => ( { ...prev, isActive: true } ) );
			} }
			ref={ container }
			style={ { position: state.isActive ? 'relative' : 'initial' } }
		>
			{ label }
			<RichText
				allowedFormats={ allowedFormats }
				className={ classNames( 'aamd_cookies_textarea', {
					'is-selected': state.isActive,
				} ) }
				data-empty={ ! initialValue.length }
				data-title="Paragraph"
				id={ id }
				inlineToolbar
				key="editable"
				name={ name }
				onChange={ setValue }
				onClick={ ( { target } ) => {
					if ( ! ( target instanceof HTMLElement ) ) {
						return;
					}
					if ( target.dataset.richTextFormatBoundary === 'true' ) {
						if (
							target.tagName.toLowerCase() === 'strong' ||
							target.parentElement?.tagName.toLowerCase() ===
								'strong'
						) {
							setState( ( prev ) => ( {
								...prev,
								isBold: true,
							} ) );
						}

						if (
							target.tagName.toLowerCase() === 'em' ||
							target.parentElement?.tagName.toLowerCase() === 'em'
						) {
							setState( ( prev ) => ( {
								...prev,
								isItalic: true,
							} ) );
						}
						return;
					}
					setState( ( prev ) => ( {
						...prev,
						isBold: false,
						isItalic: false,
					} ) );
				} }
				ref={ paragaph as unknown as React.LegacyRef< 'p' > }
				tagName="p"
				type="core/paragraph"
				value={ initialValue }
			/>
			{ state.isActive && (
				<Toolbar label="Options">
					<ToolbarGroup>
						<ToolbarButton
							icon={ formatBold }
							isActive={ state.isBold }
							label="Bold"
							onClick={ () => {
								toggle( 'core/bold' );
							} }
						/>
						<ToolbarButton
							icon={ formatItalic }
							isActive={ state.isItalic }
							label="Italic"
							onClick={ () => toggle( 'core/italic' ) }
						/>
					</ToolbarGroup>
				</Toolbar>
			) }
		</label>
	);
}
