/**
 * OpenUI5 Formatting Shim
 */
declare const Formatting: {
    getABAPDateFormat: () => void;
    getCustomIslamicCalendarData: typeof import("@ui5/webcomponents-base/dist/features/LegacyDateFormats.js").default.getLegacyDateCalendarCustomizing;
};
export default Formatting;
