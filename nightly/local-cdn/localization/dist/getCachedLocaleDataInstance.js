import LocaleData from "./LocaleData.js";
const cache = new Map();
const getCachedLocaleDataInstance = (locale) => {
    if (!cache.has(locale)) {
        // @ts-expect-error - The LocaleData constructor expects a LocaleT, but we are passing a Locale. This is a known issue and can be ignored for now.
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        cache.set(locale, new LocaleData(locale));
    }
    return cache.get(locale);
};
export default getCachedLocaleDataInstance;
//# sourceMappingURL=getCachedLocaleDataInstance.js.map