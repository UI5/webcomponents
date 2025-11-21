import { getRegisteredPackages, getThemeProperties } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
import { createOrUpdateStyle } from "@ui5/webcomponents-base/dist/ManagedStyles.js";
import { attachThemeLoaded } from "@ui5/webcomponents-base/dist/Theming.js";

const BASE_THEME_PACKAGE = "@ui5/webcomponents-theming-original";

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
		createOrUpdateStyle(cssData, "data-ui5-theme-properties-original", BASE_THEME_PACKAGE, theme);
	}
};

attachThemeLoaded(theme => {
	loadThemeBase(theme);
});
