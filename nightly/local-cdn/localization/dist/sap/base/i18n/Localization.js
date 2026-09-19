import { getTimezone as getConfigTimezone } from "@ui5/webcomponents-base/dist/config/Timezone.js";
import getLocale from "@ui5/webcomponents-base/dist/locale/getLocale.js";
const M_ISO639_OLD_TO_NEW = {
    "iw": "he",
    "ji": "yi",
};
const getModernLanguage = (sLanguage) => {
    return M_ISO639_OLD_TO_NEW[sLanguage] || sLanguage;
};
const Localization = {
    getModernLanguage,
    getLanguageTag: () => getLocale().toString(),
    getTimezone: () => getConfigTimezone() || Intl.DateTimeFormat().resolvedOptions().timeZone,
    setTimezone: () => { },
};
export default Localization;
//# sourceMappingURL=Localization.js.map