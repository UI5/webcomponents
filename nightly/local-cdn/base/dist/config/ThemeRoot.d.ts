/**
 * Returns the current theme root.
 *
 * @public
 * @since 1.14.0
 * @returns { string } the current theme root
 */
declare const getThemeRoot: () => string | undefined;
/**
 * Sets theme root for the current theme.
 * When set, the framework will validate the theme root and fetch the theme styles (CSS variables) from this location.
 *
 * **Note:** The feature is specific to custom themes, created with the `UI Theme Designer`.
 * The provided theme root is used only as a base to construct the actual location of the theme styles: `{themeRoot}/.../css_variables.css`.
 *
 * **Note:** Certain security restrictions will apply before fetching the theme assets.
 * Absolute URLs to a different origin than the current page will result in using the current page as an origin.
 *
 * **Important:** To use this feature you must explicitly allow specific origins by using &lt;meta name="sap-allowed-theme-origins" content="https://my-example-host.com/"&gt; tag inside the &lt;head&gt; of the page.
 * Failing to do so will result in a warning in the console and the theme root will not be set.
 *
 * @public
 * @since 1.14.0
 * @param { string } themeRoot the new theme root
 * @returns { Promise<void> }
 */
declare const setThemeRoot: (themeRoot: string) => Promise<void> | undefined;
declare const attachCustomThemeStylesToHead: (theme: string) => Promise<void>;
export { getThemeRoot, setThemeRoot, attachCustomThemeStylesToHead, };
