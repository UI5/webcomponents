/**
 * Returns the current theme.
 * @public
 * @returns {string} the current theme name
 */
declare const getTheme: () => string;
/**
 * Applies a new theme after fetching its assets from the network.
 * @public
 * @param {string} theme the name of the new theme
 * @returns {Promise<void>} a promise that is resolved when the new theme assets have been fetched and applied to the DOM
 */
declare const setTheme: (theme: string) => Promise<void>;
/**
 * Returns the default theme.
 *
 * Note: Default theme might be different than the configurated one.
 *
 * @public
 * @returns {string}
 */
declare const getDefaultTheme: () => string;
/**
 * Returns if the given theme name is the one currently applied.
 * @private
 * @param {string} theme
 * @returns {boolean}
 */
declare const isTheme: (theme: string) => boolean;
/**
 * Returns if the currently set theme is part of legacy theme families ("sap_fiori_3").
 * **Note**: in addition, the method checks the base theme of a custom theme, built via the ThemeDesigner.
 *
 * @private
 * @returns { boolean }
 */
declare const isLegacyThemeFamily: () => boolean;
declare const isLegacyThemeFamilyAsync: () => Promise<boolean>;
export { getTheme, setTheme, isTheme, isLegacyThemeFamily, isLegacyThemeFamilyAsync, getDefaultTheme, };
