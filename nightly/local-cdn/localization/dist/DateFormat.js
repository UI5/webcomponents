// @ts-ignore
import DateFormatNative from "./sap/ui/core/format/DateFormat.js";
import getLocale from "@ui5/webcomponents-base/dist/locale/getLocale.js";
import LocaleWrapped from "./Locale.js";
const DateFormatWrapped = DateFormatNative;
const _dateFormatCache = new Map();
class DateFormat extends DateFormatWrapped {
    static getDateInstance(oFormatOptionsOrLocale, oLocale) {
        const locale = oLocale ?? new LocaleWrapped(getLocale().toString());
        if (oFormatOptionsOrLocale instanceof LocaleWrapped) {
            return DateFormatWrapped.getDateInstance(undefined, oFormatOptionsOrLocale);
        }
        const cacheKey = `${JSON.stringify(oFormatOptionsOrLocale ?? {})}__${String(locale)}`;
        let instance = _dateFormatCache.get(cacheKey);
        if (!instance) {
            instance = DateFormatWrapped.getDateInstance(oFormatOptionsOrLocale, locale);
            _dateFormatCache.set(cacheKey, instance);
        }
        return instance;
    }
}
export default DateFormat;
//# sourceMappingURL=DateFormat.js.map