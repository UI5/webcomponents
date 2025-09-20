type I18nLoader = (localeId: string) => Promise<I18nData>;
type I18nData = Record<string, string>;
/**
 * Registers i18n loader function for given package and locale.
 *
 * @public
 * @param {string} packageName for which package this loader can fetch data
 * @param {string} localeId locale that this loader can handle
 * @param {function} loader async function that will be passed a localeId and should return a JSON object
 */
declare const registerI18nLoader: (packageName: string, localeId: string, loader: I18nLoader) => void;
declare const getI18nBundleData: (packageName: string) => I18nData | null | undefined;
/**
 * This method preforms the asynchronous task of fetching the actual text resources. It will fetch
 * each text resource over the network once (even for multiple calls to the same method).
 * It should be fully finished before the i18nBundle class is created in the webcomponents.
 * This method uses the bundle URLs that are populated by the `registerI18nBundle` method.
 * To simplify the usage, the synchronization of both methods happens internally for the same `bundleId`
 * @param {packageName} packageName the NPM package name
 * @public
 */
declare const fetchI18nBundle: (packageName: string) => Promise<void>;
export { registerI18nLoader, fetchI18nBundle, getI18nBundleData, };
