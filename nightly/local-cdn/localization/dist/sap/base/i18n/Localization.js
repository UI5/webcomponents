const M_ISO639_OLD_TO_NEW = {
    "iw": "he",
    "ji": "yi",
};
const getModernLanguage = (sLanguage) => {
    return M_ISO639_OLD_TO_NEW[sLanguage] || sLanguage;
};
const Localization = {
    getModernLanguage,
};
export default Localization;
//# sourceMappingURL=Localization.js.map