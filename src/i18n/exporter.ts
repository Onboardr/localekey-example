import { readTranslationFromDisk } from 'typesafe-i18n/exporter';
import { locales } from './i18n-util';
import { localekey } from './utils';

const exportTranslations = async () => {
	const response = await Promise.all(
		locales.map(async (localeCode) => {
			const mapping = await readTranslationFromDisk(localeCode);
			return {
				data: mapping.translations as Record<string, string>,
				localeCode,
			};
		}),
	);

	const payload: Record<string, Record<string, string>> = {};

	for (const { data, localeCode } of response) {
		payload[localeCode] = data;
	}

	await localekey.updateAll(payload);
};

void exportTranslations();
