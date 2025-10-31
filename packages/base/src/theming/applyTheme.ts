import { getThemeProperties, getRegisteredPackages, isThemeRegistered } from "../asset-registries/Themes.js";
import { createOrUpdateStyle } from "../ManagedStyles.js";
import getThemeDesignerTheme from "./getThemeDesignerTheme.js";
import { fireThemeLoaded } from "./ThemeLoaded.js";
import { attachCustomThemeStylesToHead, getThemeRoot } from "../config/ThemeRoot.js";
import { DEFAULT_THEME } from "../generated/AssetParameters.js";
import { getCurrentRuntimeIndex } from "../Runtimes.js";

// eslint-disable-next-line
export let _lib = "ui5";
// eslint-disable-next-line
export let _package = "webcomponents-theming";
// eslint-disable-next-line
const BASE_THEME_PACKAGE = "@" + _lib + "/" + _package;

const isThemeBaseRegistered = () => {
	const registeredPackages = getRegisteredPackages();
	return registeredPackages.has(BASE_THEME_PACKAGE);
};

const loadThemeBase = async (theme: string) => {
	if (!isThemeBaseRegistered()) {
		return;
	}

	const cssData = await getThemeProperties(BASE_THEME_PACKAGE, theme);
	if (cssData) {
		createOrUpdateStyle(cssData, "data-ui5-theme-properties", BASE_THEME_PACKAGE, theme);
	}
};

const loadComponentPackages = async (theme: string, externalThemeName?: string) => {
	const registeredPackages = getRegisteredPackages();

	const packagesStylesPromises = [...registeredPackages].map(async packageName => {
		if (packageName === BASE_THEME_PACKAGE) {
			return;
		}

		const cssData = await getThemeProperties(packageName, theme, externalThemeName);
		if (cssData) {
			createOrUpdateStyle(cssData, `data-ui5-component-properties-${getCurrentRuntimeIndex()}`, packageName);
		}
	});

	return Promise.all(packagesStylesPromises);
};

const detectExternalTheme = async (theme: string) => {
	if (getThemeRoot()) {
		await attachCustomThemeStylesToHead(theme);
	}

	// If theme designer theme is detected, use this
	const extTheme = getThemeDesignerTheme();
	if (extTheme) {
		return extTheme;
	}
};

const applyTheme = async (theme: string) => {
	// Detect external theme if available (e.g., from theme designer or custom theme root)
	const extTheme = await detectExternalTheme(theme);

	// Determine which theme to use for component packages:
	// 1. If the requested theme is registered, use it directly
	// 2. If external theme exists, use its base theme (e.g., "my_custom_theme" extends "sap_fiori_3")
	// 3. Otherwise, fallback to the default theme
	const packagesTheme = isThemeRegistered(theme) ? theme : extTheme && extTheme.baseThemeName;
	const effectiveTheme = packagesTheme || DEFAULT_THEME;

	// Load base theme properties
	await loadThemeBase(effectiveTheme);

	// Load component-specific theme properties
	// Pass external theme name only if it matches the requested theme to avoid conflicts
	await loadComponentPackages(effectiveTheme, extTheme && extTheme.themeName === theme ? theme : undefined);

	fireThemeLoaded(theme);
};

export default applyTheme;
