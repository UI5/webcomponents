import { getLegacyDateCalendarCustomizing } from "@ui5/webcomponents-base/dist/config/FormatSettings.js";
import { getLanguage } from "@ui5/webcomponents-base/dist/config/Language.js";
import { getCalendarType } from "@ui5/webcomponents-base/dist/config/CalendarType.js";

const emptyFn = () => {};

/**
 * OpenUI5 Formatting Shim
 */
const Formatting = {
	getABAPDateFormat: emptyFn,
	getCustomIslamicCalendarData: getLegacyDateCalendarCustomizing,
	getLanguageTag: () => getLanguage() || "en",
	getCalendarType,
	getTrailingCurrencyCode: () => true,
	getCustomLocaleData: () => ({}),
	getCalendarWeekNumbering: () => "Default",
};

export default Formatting;
