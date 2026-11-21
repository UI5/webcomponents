import { registerI18nLoader, fetchI18nBundle, getI18nBundleData } from "./asset-registries/i18n.js";
import formatMessage from "./util/formatMessage.js";
const I18nBundleInstances = new Map();
let customGetI18nBundle;
/**
 * @class
 * @public
 */
class I18nBundle {
    constructor(packageName) {
        this.packageName = packageName;
    }
    /**
     * Returns a text in the currently loaded language
     *
     * @public
     * @param textObj key/defaultText pair or just the key
     * @param params Values for the placeholders
     */
    getText(textObj, ...params) {
        if (typeof textObj === "string") {
            textObj = { key: textObj, defaultText: textObj };
        }
        if (!textObj || !textObj.key) {
            return "";
        }
        const bundle = getI18nBundleData(this.packageName);
        if (bundle && !bundle[textObj.key]) {
            // eslint-disable-next-line no-console
            console.warn(`Key ${textObj.key} not found in the i18n bundle, the default text will be used`);
        }
        const messageText = bundle && bundle[textObj.key] ? bundle[textObj.key] : (textObj.defaultText || textObj.key);
        return formatMessage(messageText, params);
    }
}
/**
 * Returns the I18nBundle instance for the given package synchronously.
 *
 * @public
 * @param packageName
 */
const getI18nBundleSync = (packageName) => {
    if (I18nBundleInstances.has(packageName)) {
        return I18nBundleInstances.get(packageName);
    }
    const i18nBundle = new I18nBundle(packageName);
    I18nBundleInstances.set(packageName, i18nBundle);
    return i18nBundle;
};
/**
 * Fetches and returns the I18nBundle instance for the given package.
 *
 * @public
 * @param packageName
 */
const getI18nBundle = async (packageName) => {
    if (customGetI18nBundle) {
        return customGetI18nBundle(packageName);
    }
    await fetchI18nBundle(packageName);
    return getI18nBundleSync(packageName);
};
/**
 * Allows developers to provide a custom getI18nBundle implementation
 * If this function is called, the custom implementation will be used for all components and will completely
 * replace the default implementation.
 *
 * @public
 * @param customGet the function to use instead of the standard getI18nBundle implementation
 */
const registerCustomI18nBundleGetter = (customGet) => {
    customGetI18nBundle = customGet;
};
export default I18nBundle;
export { registerI18nLoader, getI18nBundle, registerCustomI18nBundleGetter, };
//# sourceMappingURL=i18nBundle.js.map