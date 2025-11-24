import { getRegisteredPackages, getThemeProperties } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
import { getDefaultCSSVariablesLoading } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { createOrUpdateStyle } from "@ui5/webcomponents-base/dist/ManagedStyles.js";
import { attachThemeLoaded } from "@ui5/webcomponents-base/dist/Theming.js";

const BASE_THEME_PACKAGE = "@ui5/webcomponents-theming-raw";

const isThemeBaseRegistered = () => {
	const registeredPackages = getRegisteredPackages();
	return registeredPackages.has(BASE_THEME_PACKAGE);
};

const loadThemeBase = async (theme: string) => {
	if (getDefaultCSSVariablesLoading() !== true) {
		return;
	}

	if (!isThemeBaseRegistered()) {
		return;
	}

	const cssData = await getThemeProperties(BASE_THEME_PACKAGE, theme);
	if (cssData) {
		createOrUpdateStyle(cssData, "data-ui5-theme-properties-raw", BASE_THEME_PACKAGE, theme);
	}
};

attachThemeLoaded(theme => {
	loadThemeBase(theme);
});
