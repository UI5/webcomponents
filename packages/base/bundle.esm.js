import { registerThemePropertiesLoader } from "./dist/AssetRegistry.js";
import EventProvider from "./dist/EventProvider.js";

// ESM bundle targets browsers with native support
import "./dist/features/OpenUI5Support.js";

// Test themes - CSS Vars for the sap_fiori_3, sap_fiori_3_dark themes

// used in test pages
import { renderFinished } from "./dist/Render.js";

// used for tests - to register a custom theme
window.registerThemePropertiesLoader = registerThemePropertiesLoader;

// i18n
import { registerI18nLoader, getI18nBundle } from "./dist/i18nBundle.js";
import parseProperties from "./dist/PropertiesFileFormat.js";

// Note: keep in sync with rollup.config value for IIFE
import { getAnimationMode } from "./dist/config/AnimationMode.js";
import { getLanguage, setLanguage } from "./dist/config/Language.js";
import { getCalendarType } from "./dist/config/CalendarType.js";
import { getTheme, setTheme } from "./dist/config/Theme.js";
import { getDefaultFontLoading } from "./dist/config/Fonts.js";
import { getEnableDefaultTooltips } from "./dist/config/Tooltips.js";
import { getThemeRoot, setThemeRoot } from "./dist/config/ThemeRoot.js";
import { getNoConflict, setNoConflict } from "./dist/config/NoConflict.js";
import { getFirstDayOfWeek, getLegacyDateCalendarCustomizing } from "./dist/config/FormatSettings.js";
import { _getRegisteredNames as getIconNames } from  "./dist/asset-registries/Icons.js"
import applyDirection from "./dist/locale/applyDirection.js";
import { getCurrentRuntimeIndex } from "./dist/Runtimes.js";
import { startMultipleDrag } from "./dist/DragAndDrop.js";
import LegacyDateFormats from "./dist/features/LegacyDateFormats.js";

window["sap-ui-webcomponents-bundle"] = {
	configuration : {
		getAnimationMode,
		getLanguage,
		setLanguage,
		getTheme,
		getThemeRoot,
		setThemeRoot,
		setTheme,
		getNoConflict,
		setNoConflict,
		getCalendarType,
		getFirstDayOfWeek,
		getLegacyDateCalendarCustomizing,
		getDefaultFontLoading,
		getEnableDefaultTooltips,
	},
	getCurrentRuntimeIndex,
	getIconNames,
	parseProperties,
	registerI18nLoader,
	getI18nBundle,
	renderFinished,
	applyDirection,
	EventProvider,
	startMultipleDrag,
};
