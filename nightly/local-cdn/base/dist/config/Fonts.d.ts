/**
 * Returns if the "defaultFontLoading" configuration is set.
 * @public
 * @returns { boolean }
 */
declare const getDefaultFontLoading: () => boolean;
/**
 * Defines the "defaultFontLoading" setting.
 *
 * - When set to "true" (default), all used font faces are fetched over the network.
 * - When set to "false", default font faces are not fetched automatically and must be managed separately.
 * @public
 * @param { boolean } defaultFontLoadingData
 */
declare const setDefaultFontLoading: (defaultFontLoadingData: boolean) => void;
export { getDefaultFontLoading, setDefaultFontLoading, };
