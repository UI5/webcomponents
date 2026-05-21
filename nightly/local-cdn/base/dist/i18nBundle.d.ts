import { registerI18nLoader } from "./asset-registries/i18n.js";
type I18nText = {
    key: string;
    defaultText: string;
};
type I18nBundleGetter = (packageName: string) => Promise<I18nBundle>;
/**
 * @class
 * @public
 */
declare class I18nBundle {
    packageName: string;
    constructor(packageName: string);
    /**
     * Returns a text in the currently loaded language
     *
     * @public
     * @param textObj key/defaultText pair or just the key
     * @param params Values for the placeholders
     */
    getText(textObj: I18nText | string, ...params: Array<number | string>): string;
}
/**
 * Fetches and returns the I18nBundle instance for the given package.
 *
 * @public
 * @param packageName
 */
declare const getI18nBundle: (packageName: string) => Promise<I18nBundle>;
/**
 * Allows developers to provide a custom getI18nBundle implementation
 * If this function is called, the custom implementation will be used for all components and will completely
 * replace the default implementation.
 *
 * @public
 * @param customGet the function to use instead of the standard getI18nBundle implementation
 */
declare const registerCustomI18nBundleGetter: (customGet: I18nBundleGetter) => void;
export default I18nBundle;
export { registerI18nLoader, getI18nBundle, registerCustomI18nBundleGetter, };
export type { I18nText, };
