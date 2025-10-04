import LocaleData from "../LocaleData.js";
/**
 * Fetches and returns а LocaleData object for the required locale
 * For more information on this object's API, please see:
 * https://sdk.openui5.org/api/sap.ui.core.LocaleData
 *
 * @param { string } lang - if left empty, will use the configured/current locale
 * @returns { Promise<LocaleData> }
 */
declare const getLocaleData: (lang: string) => Promise<LocaleData>;
export default getLocaleData;
