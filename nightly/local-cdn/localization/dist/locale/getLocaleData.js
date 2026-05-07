import { fetchCldr } from "@ui5/webcomponents-base/dist/asset-registries/LocaleData.js";
import getLocale from "@ui5/webcomponents-base/dist/locale/getLocale.js";
import LocaleData from "../LocaleData.js";
const instances = new Map();
/**
 * Fetches and returns а LocaleData object for the required locale
 * For more information on this object's API, please see:
 * https://sdk.openui5.org/api/sap.ui.core.LocaleData
 *
 * @param { string } lang - if left empty, will use the configured/current locale
 * @returns { Promise<LocaleData> }
 */
const getLocaleData = async (lang) => {
    const locale = getLocale(lang);
    const localeLang = locale.getLanguage();
    if (!instances.has(localeLang)) {
        await fetchCldr(locale.getLanguage(), locale.getRegion(), locale.getScript());
        // @ts-expect-error - The LocaleData constructor expects a LocaleT, but we are passing a Locale. This is a known issue and can be ignored for now.
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        instances.set(localeLang, new LocaleData(locale));
    }
    return instances.get(localeLang);
};
export default getLocaleData;
//# sourceMappingURL=getLocaleData.js.map