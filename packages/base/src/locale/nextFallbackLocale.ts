import { DEFAULT_LOCALE } from "../generated/AssetParameters.js";

const LOCALE_FALBACK_MAP = {
	"zh_HK": "zh_TW",
	"in": "id",
};

/**
 * Calculates the next fallback locale for the given locale.
 *
 * @param {string} locale Locale string in Java format (underscores) or null
 * @returns {string} Next fallback Locale or "en" if no fallbacks found.
 */
const nextFallbackLocale = (locale: string) => {
	if (!locale) {
		return DEFAULT_LOCALE;
	}

	if (LOCALE_FALBACK_MAP[locale as keyof typeof LOCALE_FALBACK_MAP]) {
		return LOCALE_FALBACK_MAP[locale as keyof typeof LOCALE_FALBACK_MAP];
	}

	// if there are multiple segments (separated by underscores), remove the last one
	const p = locale.lastIndexOf("_");
	if (p >= 0) {
		return locale.slice(0, p);
	}

	// for any language but the default, fallback to the default first before falling back to the 'raw' language (empty string)
	return locale !== DEFAULT_LOCALE ? DEFAULT_LOCALE : "";
};

export default nextFallbackLocale;
