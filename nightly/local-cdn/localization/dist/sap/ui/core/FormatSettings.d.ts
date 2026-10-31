/**
 * OpenUI5 FormatSettings shim
 */
declare const FormatSettings: {
    getFormatLocale: (lang?: string) => import("@ui5/webcomponents-base/dist/locale/Locale.js").default;
    getLegacyDateFormat: () => void;
    getCustomLocaleData: () => void;
};
export default FormatSettings;
