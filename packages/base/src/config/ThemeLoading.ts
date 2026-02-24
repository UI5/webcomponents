import { getSkipThemeBase as getConfiguredSkipThemeBase } from "../InitialConfiguration.js";
import { attachConfigurationReset } from "./ConfigurationReset.js";

let skipThemeBase: boolean | undefined;

attachConfigurationReset(() => {
	skipThemeBase = undefined;
});

/**
 * Returns if theme base loading should be skipped.
 *
 * When set to "true", the framework will skip loading the base theme CSS variables (--sap*).
 * When set to "false" (default), both base (--sap*) are loaded.
 *
 * This is useful when the application provides theme variables externally
 * and handles theming independently from the framework.
 *
 * @public
 * @since 2.20.0
 * @returns { boolean }
 */
const getSkipThemeBase = (): boolean => {
	if (skipThemeBase === undefined) {
		skipThemeBase = getConfiguredSkipThemeBase();
	}

	return skipThemeBase;
};

/**
 * Sets whether theme base loading should be skipped.
 *
 * - When set to "true", the framework will skip loading base theme CSS variables (--sap*).
 * - When set to "false" (default), both base (--sap*) variables will be loaded.
 *
 * **Note:** This setting should be used as early as possible in the application lifecycle, ideally before any theme is applied, to ensure it takes effect.
 *
 * @public
 * @since 2.20.0
 * @param { boolean } skip - whether to skip loading base theme variables
 */
const setSkipThemeBase = (skip: boolean) => {
	skipThemeBase = skip;
};

export {
	getSkipThemeBase,
	setSkipThemeBase,
};
