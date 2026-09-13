import { getLanguage as getConfiguredLanguage, getFetchDefaultLanguage as getConfiguredFetchDefaultLanguage, } from "../InitialConfiguration.js";
import { fireLanguageChange } from "../locale/languageChange.js";
import { reRenderAllUI5Elements } from "../Render.js";
import { DEFAULT_LANGUAGE } from "../generated/AssetParameters.js";
import { isBooted } from "../Boot.js";
import { attachConfigurationReset } from "./ConfigurationReset.js";
import { fireConfigChange, attachConfigChange, getSharedValue } from "./ConfigurationSync.js";
let curLanguage;
let fetchDefaultLanguage;
attachConfigurationReset(() => {
    curLanguage = undefined;
    fetchDefaultLanguage = undefined;
});
// Promise that resolves when the current language change (i18n bundles + CLDR data)
// completes, or `null` when no language change is in flight. Consumers that need to
// wait for locale data to be ready before rendering — most notably language-aware
// UI5Element instances mounted while setLanguage is in flight — can await it.
let languageChangePending = null;
const startLanguageChange = (language) => {
    const changePromise = fireLanguageChange(language).then(() => {
        if (isBooted()) {
            return reRenderAllUI5Elements({ languageAware: true });
        }
    }).finally(() => {
        // Only clear if no newer change has already replaced us
        if (languageChangePending === changePromise) {
            languageChangePending = null;
        }
    });
    languageChangePending = changePromise;
    return changePromise;
};
attachConfigChange("language", (language) => {
    curLanguage = language;
    startLanguageChange(language);
});
const getLanguageChangePending = () => languageChangePending;
/**
 * Returns the currently configured language, or the browser language as a fallback.
 * @public
 * @returns {string}
 */
const getLanguage = () => {
    if (curLanguage === undefined) {
        curLanguage = getSharedValue("language") ?? getConfiguredLanguage();
    }
    return curLanguage;
};
/**
 * Changes the current language, re-fetches all message bundles, updates all language-aware components
 * and returns a promise that resolves when all rendering is done.
 *
 * @param {string} language
 * @public
 * @returns {Promise<void>}
 */
const setLanguage = async (language) => {
    if (curLanguage === language) {
        return;
    }
    curLanguage = language;
    fireConfigChange("language", language);
    await startLanguageChange(language);
};
/**
 * Returns the default languague.
 *
 * Note: Default language might be different than the configurated one.
 *
 * @public
 * @returns {string}
 */
const getDefaultLanguage = () => {
    return DEFAULT_LANGUAGE;
};
/**
 * Defines if the default language, that is inlined, should be
 * fetched over the network instead of using the inlined one.
 * **Note:** By default the language will not be fetched.
 *
 * @public
 * @param {boolean} fetchDefaultLang
 */
const setFetchDefaultLanguage = (fetchDefaultLang) => {
    fetchDefaultLanguage = fetchDefaultLang;
};
/**
 * Returns if the default language, that is inlined, should be fetched over the network.
 * @public
 * @returns {boolean}
 */
const getFetchDefaultLanguage = () => {
    if (fetchDefaultLanguage === undefined) {
        fetchDefaultLanguage = getConfiguredFetchDefaultLanguage();
    }
    return fetchDefaultLanguage;
};
export { getLanguage, setLanguage, getDefaultLanguage, setFetchDefaultLanguage, getFetchDefaultLanguage, getLanguageChangePending, };
//# sourceMappingURL=Language.js.map