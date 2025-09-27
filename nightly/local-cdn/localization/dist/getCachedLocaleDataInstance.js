import LocaleData from "./LocaleData.js";
const cache = new Map();
const getCachedLocaleDataInstance = (locale) => {
    if (!cache.has(locale)) {
        cache.set(locale, new LocaleData(locale));
    }
    return cache.get(locale);
};
export default getCachedLocaleDataInstance;
//# sourceMappingURL=getCachedLocaleDataInstance.js.map