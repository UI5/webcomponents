/**
 * Returns if the "ignoreUrlParams" configuration is set.
 * @public
 * @since 2.23.0
 * @returns { boolean }
 */
declare const getIgnoreUrlParams: () => boolean;
/**
 * Defines the "ignoreUrlParams" setting.
 *
 * - When set to "true", the framework will not process URL parameters
 * (e.g. sap-ui-theme, sap-ui-language) during initialization.
 * - When set to "false" (default), URL parameters are processed normally.
 *
 * @public
 * @since 2.23.0
 * @param { boolean } ignoreUrlParams
 */
declare const setIgnoreUrlParams: (ignoreUrlParams: boolean) => void;
export { getIgnoreUrlParams, setIgnoreUrlParams, };
