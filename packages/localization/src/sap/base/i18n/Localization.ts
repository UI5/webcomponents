import { getLanguage } from "@ui5/webcomponents-base/dist/config/Language.js";
import { getTimezone as getConfigTimezone } from "@ui5/webcomponents-base/dist/config/Timezone.js";

const M_ISO639_OLD_TO_NEW = {
	"iw": "he",
	"ji": "yi",
};

const getModernLanguage = (sLanguage: string) => {
	return M_ISO639_OLD_TO_NEW[sLanguage as keyof typeof M_ISO639_OLD_TO_NEW] || sLanguage;
};

const Localization = {
	getModernLanguage,
	getLanguageTag: () => getLanguage() || "en",
	getTimezone: () => getConfigTimezone() || Intl.DateTimeFormat().resolvedOptions().timeZone,
	setTimezone: () => {},
};

export default Localization;
