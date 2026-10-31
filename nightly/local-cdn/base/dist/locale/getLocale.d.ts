import Locale from "./Locale.js";
/**
 * Returns the locale based on the parameter or configured language Configuration#getLanguage
 * If no language has been configured - a new locale based on browser language is returned
 */
declare const getLocale: (lang?: string) => Locale;
export default getLocale;
