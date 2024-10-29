import de from '@/i18n/de.json';
import dk from '@/i18n/dk.json';
import en from '@/i18n/en.json';
import es from '@/i18n/es.json';
import fin from '@/i18n/fin.json';
import fr from '@/i18n/fr.json';
import no from '@/i18n/no.json';
import sv from '@/i18n/sv.json';

export const languages = [
		'de',
		'dk',
		'en',
		'es',
		'fin',
		'fr',
		'nb',
		'no',
		'sv',
	] as const,
	fallbackLanguage = 'en',
	browserLanguage =
		document.documentElement.lang.toLowerCase() || fallbackLanguage,
	translation =
		languages.find( ( lang ) => browserLanguage.includes( lang ) ) ||
		fallbackLanguage;

/**
 *
 */
export default function getTranslation() {
	switch ( translation ) {
		case 'de':
			return de;
		case 'dk':
			return dk;
		case 'es':
			return es;
		case 'fin':
			return fin;
		case 'fr':
			return fr;
		case 'no':
		case 'nb':
			return no;
		case 'sv':
			return sv;
		default:
			return en;
	}
}
