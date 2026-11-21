/**
 * Returns if the "enableDefaultTooltips" configuration is set.
 * @public
 * @since 2.1.0
 * @returns { boolean }
 */
declare const getEnableDefaultTooltips: () => boolean;
/**
 * Defines the "enableDefaultTooltips" setting.
 *
 * - When set to "true" (default), the components will display default tooltips.
 * - When set to "false", the components will NOT display default tooltips.
 *
 * @public
 * @since 2.1.0
 * @param { boolean } enableDefaultTooltips
 */
declare const setEnableDefaultTooltips: (enableDefaultTooltips: boolean) => void;
export { getEnableDefaultTooltips, setEnableDefaultTooltips, };
