declare const getLanguageChangePending: () => boolean;
/**
 * Returns the currently configured language, or the browser language as a fallback.
 * @public
 * @returns {string}
 */
declare const getLanguage: () => string | undefined;
/**
 * Changes the current language, re-fetches all message bundles, updates all language-aware components
 * and returns a promise that resolves when all rendering is done.
 *
 * @param {string} language
 * @public
 * @returns {Promise<void>}
 */
declare const setLanguage: (language: string) => Promise<void>;
/**
 * Returns the default languague.
 *
 * Note: Default language might be different than the configurated one.
 *
 * @public
 * @returns {string}
 */
declare const getDefaultLanguage: () => string;
/**
 * Defines if the default language, that is inlined, should be
 * fetched over the network instead of using the inlined one.
 * **Note:** By default the language will not be fetched.
 *
 * @public
 * @param {boolean} fetchDefaultLang
 */
declare const setFetchDefaultLanguage: (fetchDefaultLang: boolean) => void;
/**
 * Returns if the default language, that is inlined, should be fetched over the network.
 * @public
 * @returns {boolean}
 */
declare const getFetchDefaultLanguage: () => boolean;
export { getLanguage, setLanguage, getDefaultLanguage, setFetchDefaultLanguage, getFetchDefaultLanguage, getLanguageChangePending, };
