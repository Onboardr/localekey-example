import { storeTranslationToDisk } from 'typesafe-i18n/importer';
import { localekey } from './utils';

const importTranslations = async () => {
	const locales = await localekey.readAll();

	await Promise.all(
		Object.entries(locales).map(async ([locale, data]) =>
			storeTranslationToDisk({
				locale,
				translations: data,
			}),
		),
	);
};

void importTranslations();
