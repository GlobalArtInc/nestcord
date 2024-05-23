import { Locale, LocaleString, LocalizationMap } from 'discord-api-types/v10';

export function localizationMapByKey(key: string, only: LocaleString[] = []): LocalizationMap {
	return Object.values(Locale)
		.filter(locale => {
			if (only.length) {
				return only.includes(locale);
			}

			return true;
		})
		.reduce((acc, locale) => {
			acc[locale] = key;
			return acc;
		}, {});
}
