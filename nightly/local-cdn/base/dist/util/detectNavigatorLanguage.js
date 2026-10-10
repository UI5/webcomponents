import { DEFAULT_LANGUAGE } from "../generated/AssetParameters.js";
const isSSR = typeof document === "undefined";
const detectNavigatorLanguage = () => {
    if (isSSR) {
        return DEFAULT_LANGUAGE;
    }
    const browserLanguages = navigator.languages;
    const navigatorLanguage = () => {
        return navigator.language;
    };
    const rawLocale = (browserLanguages && browserLanguages[0]) || navigatorLanguage();
    return rawLocale || DEFAULT_LANGUAGE;
};
export default detectNavigatorLanguage;
//# sourceMappingURL=detectNavigatorLanguage.js.map