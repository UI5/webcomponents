import detectNavigatorLanguage from "../util/detectNavigatorLanguage.js";
import { getLanguage as getConfigLanguage } from "../config/Language.js";
import Locale from "./Locale.js";
import { DEFAULT_LOCALE } from "../generated/AssetParameters.js";
const cache = new Map();
const getLocaleInstance = (lang) => {
    if (!cache.has(lang)) {
        cache.set(lang, new Locale(lang));
    }
    return cache.get(lang);
};
const convertToLocaleOrNull = (lang) => {
    try {
        if (lang && typeof lang === "string") {
            return getLocaleInstance(lang);
        }
    }
    catch (e) {
        // ignore
    }
    return new Locale(DEFAULT_LOCALE);
};
/**
 * Returns the locale based on the parameter or configured language Configuration#getLanguage
 * If no language has been configured - a new locale based on browser language is returned
 */
const getLocale = (lang) => {
    if (lang) {
        return convertToLocaleOrNull(lang);
    }
    const configLanguage = getConfigLanguage();
    if (configLanguage) {
        return getLocaleInstance(configLanguage);
    }
    return convertToLocaleOrNull(detectNavigatorLanguage());
};
export default getLocale;
//# sourceMappingURL=getLocale.js.map