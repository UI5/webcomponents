/**
 * OpenUI5 Core shim
 */
declare const Core: {
    getConfiguration: () => {
        getLanguage: () => string | undefined;
        getCalendarType: () => import("@ui5/webcomponents-base/dist/types/CalendarType.js").default;
        getSupportedLanguages: () => string[] | null;
        getOriginInfo: () => void;
        getFormatSettings: () => {
            getFormatLocale: (lang?: string) => import("@ui5/webcomponents-base/dist/locale/Locale.js").default;
            getLegacyDateFormat: () => void;
            getCustomLocaleData: () => void;
        };
        getTimezone: () => string;
        getCalendarWeekNumbering: () => string;
    };
    getLibraryResourceBundle: void;
    getFormatSettings: () => {
        getFormatLocale: (lang?: string) => import("@ui5/webcomponents-base/dist/locale/Locale.js").default;
        getLegacyDateFormat: () => void;
        getCustomLocaleData: () => void;
    };
};
export default Core;
