import { RichText } from '@wordpress/block-editor';
// import { Toolbar, ToolbarGroup, ToolbarButton } from '@wordpress/components';
// import { paragraph, formatBold, formatItalic, link } from '@wordpress/icons';

export default function TextEditor( {
	allowedFormats = [ 'core/bold', 'core/italic' ],
	id,
	label,
	name,
	value,
	setValue,
}: {
	allowedFormats?: string[];
	id: string;
	label: string;
	name: string;
	value: string;
	setValue: ( val: string ) => void;
} ) {
	return (
		<label className="form-label" htmlFor={ id }>
			{ label }
			<RichText
				id={ id }
				name={ name }
				className="aamd_cookies_textarea"
				value={ value }
				allowedFormats={ allowedFormats }
				onChange={ setValue }
			/>
			{ /* <Toolbar label="Options">
				<ToolbarGroup>
					<ToolbarButton icon={ paragraph } label="Paragraph" />
				</ToolbarGroup>
				<ToolbarGroup>
					<ToolbarButton icon={ formatBold } label="Bold" />
					<ToolbarButton icon={ formatItalic } label="Italic" />
					<ToolbarButton icon={ link } label="Link" />
				</ToolbarGroup>
			</Toolbar> */ }
		</label>
	);
}
