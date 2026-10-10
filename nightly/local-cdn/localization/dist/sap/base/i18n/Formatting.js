import { getLegacyDateCalendarCustomizing } from "@ui5/webcomponents-base/dist/config/FormatSettings.js";
import { getCalendarType } from "@ui5/webcomponents-base/dist/config/CalendarType.js";
import getLocale from "@ui5/webcomponents-base/dist/locale/getLocale.js";
const emptyFn = () => { };
/**
 * OpenUI5 Formatting Shim
 */
const Formatting = {
    getABAPDateFormat: emptyFn,
    getCustomIslamicCalendarData: getLegacyDateCalendarCustomizing,
    getLanguageTag: () => getLocale().toString(),
    getCalendarType,
    getTrailingCurrencyCode: () => true,
    getCustomLocaleData: () => ({}),
    getCalendarWeekNumbering: () => "Default",
};
export default Formatting;
//# sourceMappingURL=Formatting.js.map