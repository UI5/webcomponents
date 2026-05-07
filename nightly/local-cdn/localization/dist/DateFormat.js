// @ts-ignore
import DateFormatNative from "./sap/ui/core/format/DateFormat.js";
import getLocale from "@ui5/webcomponents-base/dist/locale/getLocale.js";
import LocaleWrapped from "./Locale.js";
const DateFormatWrapped = DateFormatNative;
class DateFormat extends DateFormatWrapped {
    static getDateInstance(oFormatOptionsOrLocale, oLocale) {
        if (oFormatOptionsOrLocale instanceof LocaleWrapped) {
            return DateFormatWrapped.getDateInstance(undefined, oFormatOptionsOrLocale);
        }
        const nativeLocale = oLocale ?? new LocaleWrapped(getLocale().toString());
        return DateFormatWrapped.getDateInstance(oFormatOptionsOrLocale, nativeLocale);
    }
}
export default DateFormat;
//# sourceMappingURL=DateFormat.js.map