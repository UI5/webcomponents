import { DEFAULT_THEME } from "../generated/AssetParameters.js";
import { mergeStyles } from "../ManagedStyles.js";
import { fireThemeRegistered } from "../theming/ThemeRegistered.js";

type ThemeData = string;
type ThemeLoader = (themeName: string) => Promise<string>;

type CSSVariablesSchema = "global" | "local";

const themeStyles = new Map<string, string>();
const loaders = new Map<string, ThemeLoader>();
const customLoaders = new Map<string, ThemeLoader>();
const registeredPackages = new Map<string, { cssVariablesSchema: CSSVariablesSchema }>();
const registeredThemes = new Set<string>();

const registerThemePropertiesLoader = (packageName: string, themeName: string, loader: ThemeLoader, cssVariablesSchema: CSSVariablesSchema = "global") => {
	loaders.set(`${packageName}/${themeName}`, loader);
	registeredPackages.set(packageName, { cssVariablesSchema });
	registeredThemes.add(themeName);
	fireThemeRegistered(themeName);
};

const registerCustomThemePropertiesLoader = (packageName: string, themeName: string, loader: ThemeLoader) => {
	customLoaders.set(`${packageName}/${themeName}`, loader);
};

const getThemeProperties = async (packageName: string, themeName: string, externalThemeName?: string) => {
	const cacheKey = `${packageName}_${themeName}_${externalThemeName || ""}`;
	const cachedStyleData = themeStyles.get(cacheKey);
	if (cachedStyleData !== undefined) { // it's valid for style to be an empty string
		return cachedStyleData;
	}

	if (!registeredThemes.has(themeName)) {
		const regThemesStr = [...registeredThemes.values()].join(", ");
		console.warn(`You have requested a non-registered theme ${themeName} - falling back to ${DEFAULT_THEME}. Registered themes are: ${regThemesStr}`); /* eslint-disable-line */
		return _getThemeProperties(packageName, DEFAULT_THEME);
	}

	const [style, customStyle] = await Promise.all([
		_getThemeProperties(packageName, themeName),
		externalThemeName ? _getThemeProperties(packageName, externalThemeName, true) : undefined,
	]);

	const styleData = mergeStyles(style, customStyle);
	if (styleData) {
		themeStyles.set(cacheKey, styleData);
	}

	return styleData;
};

const _getThemeProperties = async (packageName: string, themeName: string, forCustomTheme = false) => {
	const loadersMap = forCustomTheme ? customLoaders : loaders;
	const loader = loadersMap.get(`${packageName}/${themeName}`);
	if (!loader) {
		// no themes for package
		if (!forCustomTheme) {
			console.error(`Theme [${themeName}] not registered for package [${packageName}]`); /* eslint-disable-line */
		}
		return;
	}
	let data;
	try {
		data = await loader(themeName);
	} catch (error: unknown) {
		const e = error as Error;
		console.error(packageName, e.message); /* eslint-disable-line */
		return;
	}

	return data;
};

const getRegisteredPackages = () => {
	return registeredPackages;
};

const isThemeRegistered = (theme: string) => {
	return registeredThemes.has(theme);
};

export {
	registerThemePropertiesLoader,
	registerCustomThemePropertiesLoader,
	getThemeProperties,
	getRegisteredPackages,
	isThemeRegistered,
};

export type {
	ThemeData,
	ThemeLoader,
};
