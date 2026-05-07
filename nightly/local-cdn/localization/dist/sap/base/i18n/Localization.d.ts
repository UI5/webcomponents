declare const Localization: {
    getModernLanguage: (sLanguage: string) => string;
    getLanguageTag: () => string;
    getTimezone: () => string;
    setTimezone: () => void;
};
export default Localization;
