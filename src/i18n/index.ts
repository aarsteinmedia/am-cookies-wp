import en from './en.json';
import fr from './fr.json';
import no from './no.json';

export const languages = [ 'en', 'fr', 'nb', 'no' ] as const,
	fallbackLanguage = 'en',
	browserLanguage =
		document.documentElement.lang.toLowerCase() || fallbackLanguage,
	translation =
		languages.find( ( lang ) => browserLanguage.includes( lang ) ) ||
		fallbackLanguage;

export default function getTranslation() {
	switch ( translation ) {
		case 'fr':
			return fr;
		case 'no':
		case 'nb':
			return no;
		default:
			return en;
	}
}
