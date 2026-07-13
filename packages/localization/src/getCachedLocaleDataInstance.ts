import type Locale from "@ui5/webcomponents-base/dist/locale/Locale.js";
import type LocaleT from "sap/ui/core/Locale";
import { attachLanguageChange } from "@ui5/webcomponents-base/dist/locale/languageChange.js";
import LocaleData from "./LocaleData.js";

const cache = new Map<Locale, LocaleData>();

// Invalidate cached LocaleData instances on language change so that the next
// access creates a fresh instance after the new locale's CLDR data has loaded.
attachLanguageChange(() => {
	cache.clear();
	return Promise.resolve();
});

const getCachedLocaleDataInstance = (locale: Locale) => {
	if (!cache.has(locale)) {
		// @ts-expect-error - The LocaleData constructor expects a LocaleT, but we are passing a Locale. This is a known issue and can be ignored for now.
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		cache.set(locale, new LocaleData(locale as unknown as LocaleT));
	}

	return cache.get(locale)!;
};

export default getCachedLocaleDataInstance;
