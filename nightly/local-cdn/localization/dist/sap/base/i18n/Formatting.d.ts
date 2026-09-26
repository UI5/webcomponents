/**
 * OpenUI5 Formatting Shim
 */
declare const Formatting: {
    getABAPDateFormat: () => void;
    getCustomIslamicCalendarData: typeof import("@ui5/webcomponents-base/dist/features/LegacyDateFormats.js").default.getLegacyDateCalendarCustomizing;
    getLanguageTag: () => string;
    getCalendarType: () => import("@ui5/webcomponents-base/dist/types/CalendarType.js").default;
    getTrailingCurrencyCode: () => boolean;
    getCustomLocaleData: () => {};
    getCalendarWeekNumbering: () => string;
};
export default Formatting;
