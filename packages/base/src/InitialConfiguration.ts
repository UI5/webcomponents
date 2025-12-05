import merge from "./thirdparty/merge.js";
import { getFeature } from "./FeaturesRegistry.js";
import { DEFAULT_THEME } from "./generated/AssetParameters.js";
import validateThemeRoot from "./validateThemeRoot.js";
import type OpenUI5Support from "./features/OpenUI5Support.js";
import type { FormatSettings } from "./config/FormatSettings.js";
import AnimationMode from "./types/AnimationMode.js";
import type CalendarType from "./types/CalendarType.js";
import { resetConfiguration as resetConfigurationFn } from "./config/ConfigurationReset.js";
import { getLocationSearch } from "./Location.js";

let initialized = false;

type InitialConfig = {
	[key: string]: any,
	animationMode: AnimationMode,
	theme: string,
	themeRoot: string | undefined,
	language: string | undefined,
	calendarType: CalendarType | undefined,
	secondaryCalendarType: CalendarType | undefined,
	timezone: string | undefined,
	noConflict: boolean,
	formatSettings: FormatSettings,
	fetchDefaultLanguage: boolean,
	defaultFontLoading: boolean,
	enableDefaultTooltips: boolean,
};

let initialConfig: InitialConfig = {
	animationMode: AnimationMode.Full,
	theme: DEFAULT_THEME,
	themeRoot: undefined,
	rtl: undefined,
	language: undefined,
	timezone: undefined,
	calendarType: undefined,
	secondaryCalendarType: undefined,
	noConflict: false, // no URL
	formatSettings: {},
	fetchDefaultLanguage: false,
	defaultFontLoading: true,
	enableDefaultTooltips: true,
};

/* General settings */
const getAnimationMode = () => {
	initConfiguration();
	return initialConfig.animationMode;
};

const getTheme = () => {
	initConfiguration();
	return initialConfig.theme;
};

const getThemeRoot = () => {
	initConfiguration();

	if (initialConfig.themeRoot === undefined) {
		return;
	}

	if (!validateThemeRoot(initialConfig.themeRoot)) {
		console.warn(`The ${initialConfig.themeRoot} is not valid. Check the allowed origins as suggested in the "setThemeRoot" description.`); // eslint-disable-line
		return;
	}

	return initialConfig.themeRoot;
};

const getLanguage = () => {
	initConfiguration();
	return initialConfig.language;
};

/**
 * Returns if the default language, that is inlined at build time,
 * should be fetched over the network instead.
 * @returns {Boolean}
 */
const getFetchDefaultLanguage = () => {
	initConfiguration();
	return initialConfig.fetchDefaultLanguage;
};

const getNoConflict = () => {
	initConfiguration();
	return initialConfig.noConflict;
};

const getDefaultFontLoading = () => {
	initConfiguration();
	return initialConfig.defaultFontLoading;
};

const getEnableDefaultTooltips = () => {
	initConfiguration();
	return initialConfig.enableDefaultTooltips;
};

/**
 * Get the configured calendar type
 * @returns { String } the name of the configured calendar type
 */
const getCalendarType = () => {
	initConfiguration();
	return initialConfig.calendarType;
};

const getSecondaryCalendarType = () => {
	initConfiguration();
	return initialConfig.secondaryCalendarType;
};

/**
 * Returns the configured IANA timezone ID.
 * @returns { String } the configured IANA timezone ID, e.g. "America/New_York"
 */
const getTimezone = () => {
	initConfiguration();
	return initialConfig.timezone;
};

const getFormatSettings = () => {
	initConfiguration();
	return initialConfig.formatSettings;
};

const booleanMapping = new Map();
booleanMapping.set("true", true);
booleanMapping.set("false", false);

const parseConfigurationScript = () => {
	const configScript = document.querySelector("[data-ui5-config]") || document.querySelector("[data-id='sap-ui-config']"); // for backward compatibility

	let configJSON;

	if (configScript) {
		try {
			configJSON = JSON.parse(configScript.innerHTML);
		} catch (err) {
			console.warn("Incorrect data-sap-ui-config format. Please use JSON"); /* eslint-disable-line */
		}

		if (configJSON) {
			initialConfig = merge(initialConfig, configJSON);
		}
	}
};

const parseURLParameters = () => {
	const params = new URLSearchParams(getLocationSearch());

	// Process "sap-*" params first
	params.forEach((value, key) => {
		const parts = key.split("sap-").length;
		if (parts === 0 || parts === key.split("sap-ui-").length) {
			return;
		}

		applyURLParam(key, value, "sap");
	});

	// Process "sap-ui-*" params
	params.forEach((value, key) => {
		if (!key.startsWith("sap-ui")) {
			return;
		}

		applyURLParam(key, value, "sap-ui");
	});
};

const normalizeThemeRootParamValue = (value: string) => {
	const themeRoot = value.split("@")[1];

	return validateThemeRoot(themeRoot);
};

const normalizeThemeParamValue = (param: string, value: string) => {
	if (param === "theme" && value.includes("@")) { // the theme parameter might have @<URL-TO-THEME> in the value - strip this
		return value.split("@")[0];
	}

	return value;
};

const applyURLParam = (key: string, value: string, paramType: string) => {
	const lowerCaseValue = value.toLowerCase();
	const param = key.split(`${paramType}-`)[1];

	if (booleanMapping.has(value)) {
		value = booleanMapping.get(lowerCaseValue);
	}

	if (param === "theme") {
		initialConfig.theme = normalizeThemeParamValue(param, value);

		if (value && value.includes("@")) {
			initialConfig.themeRoot = normalizeThemeRootParamValue(value);
		}
	} else {
		initialConfig[param] = value;
	}
};

const applyOpenUI5Configuration = () => {
	const openUI5Support = getFeature<typeof OpenUI5Support>("OpenUI5Support");
	if (!openUI5Support || !openUI5Support.isOpenUI5Detected()) {
		return;
	}

	const OpenUI5Config = openUI5Support.getConfigurationSettingsObject();
	initialConfig = merge(initialConfig, OpenUI5Config);
};

const initConfiguration = () => {
	if (typeof document === "undefined" || initialized) {
		return;
	}

	resetConfiguration();

	initialized = true;
};

/**
 * Internaly exposed method to enable configurations in tests.
 * @private
 */
const resetConfiguration = (testEnv?: boolean) => {
	if (testEnv) {
		resetConfigurationFn();
	}
	// 1. Lowest priority - configuration script
	parseConfigurationScript();

	// 2. URL parameters overwrite configuration script parameters
	parseURLParameters();

	// 3. If OpenUI5 is detected, it has the highest priority
	applyOpenUI5Configuration();
};

export {
	getAnimationMode,
	getTheme,
	getThemeRoot,
	getLanguage,
	getFetchDefaultLanguage,
	getNoConflict,
	getCalendarType,
	getSecondaryCalendarType,
	getTimezone,
	getFormatSettings,
	getDefaultFontLoading,
	resetConfiguration,
	getEnableDefaultTooltips,
};
