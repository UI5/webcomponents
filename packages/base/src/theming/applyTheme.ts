import { getThemeProperties, getRegisteredPackages, isThemeRegistered } from "../asset-registries/Themes.js";
import { createOrUpdateStyle } from "../ManagedStyles.js";
import getThemeDesignerTheme from "./getThemeDesignerTheme.js";
import { fireThemeLoaded } from "./ThemeLoaded.js";
import { getFeature } from "../FeaturesRegistry.js";
import { attachCustomThemeStylesToHead, getThemeRoot } from "../config/ThemeRoot.js";
import type OpenUI5Support from "../features/OpenUI5Support.js";
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
	// If theme designer theme is detected, use this
	const extTheme = getThemeDesignerTheme();
	if (extTheme) {
		return extTheme;
	}

	// If OpenUI5Support is enabled, try to find out if it loaded variables
	const openUI5Support = getFeature<typeof OpenUI5Support>("OpenUI5Support");
	if (openUI5Support && openUI5Support.isOpenUI5Detected()) {
		const varsLoaded = openUI5Support.cssVariablesLoaded();
		if (varsLoaded) {
			return {
				themeName: openUI5Support.getConfigurationSettingsObject()?.theme, // just themeName
				baseThemeName: "", // baseThemeName is only relevant for custom themes
			};
		}
	} else if (getThemeRoot()) {
		await attachCustomThemeStylesToHead(theme);

		return getThemeDesignerTheme();
	}
};

const applyTheme = async (theme: string) => {
	const extTheme = await detectExternalTheme(theme);

	// Always load component packages properties. For non-registered themes, try with the base theme, if any
	const packagesTheme = isThemeRegistered(theme) ? theme : extTheme && extTheme.baseThemeName;
	const effectiveTheme = packagesTheme || DEFAULT_THEME;

	await loadThemeBase(effectiveTheme);
	await loadComponentPackages(effectiveTheme, extTheme && extTheme.themeName === theme ? theme : undefined);

	fireThemeLoaded(theme);
};

export default applyTheme;
