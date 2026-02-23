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
 * Only scoped CSS variables (--ui5-sap*) will be loaded.
 * When set to "false" (default), both base (--sap*) and scoped (--ui5-sap*) variables are loaded.
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
 *   Only scoped CSS variables (--ui5-sap*) will be loaded.
 * - When set to "false" (default), both base (--sap*) and scoped (--ui5-sap*) variables will be loaded.
 *
 * **Note:** This setting takes effect on the next theme application.
 * To apply immediately, call `setTheme()` with the current theme after changing this setting.
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
