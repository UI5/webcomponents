import { setRuntimeAlias } from "@ui5/webcomponents-base/dist/Runtimes.js";

/* eslint-disable @typescript-eslint/no-unused-vars */
// OpenUI5 integration
import OpenUI5Support from "@ui5/webcomponents-base/dist/features/OpenUI5Support.js";

// Assets
import "./Assets.js";

// Icons
import "@ui5/webcomponents-icons/dist/Assets.js";
import "@ui5/webcomponents-icons/dist/AllIcons.js";

// TNT Icons
import "@ui5/webcomponents-icons-tnt/dist/Assets.js";
import "@ui5/webcomponents-icons-tnt/dist/AllIcons.js";

// SAP Business Suite Icons
import "@ui5/webcomponents-icons-business-suite/dist/Assets.js";
import "@ui5/webcomponents-icons-business-suite/dist/AllIcons.js";

import "@ui5/webcomponents-base/dist/features/F6Navigation.js";
import { addCustomCSS, attachThemeLoaded, detachThemeLoaded } from "@ui5/webcomponents-base/dist/Theming.js";
// import "./customI18n.js";

// Calendars
import "@ui5/webcomponents-localization/dist/features/calendar/Buddhist.js";
import "@ui5/webcomponents-localization/dist/features/calendar/Islamic.js";
import "@ui5/webcomponents-localization/dist/features/calendar/Japanese.js";
import "@ui5/webcomponents-localization/dist/features/calendar/Persian.js";

// CLDR
import getLocaleData from "@ui5/webcomponents-localization/dist/locale/getLocaleData.js";

// import { registerCustomThemePropertiesLoader } from "@ui5/webcomponents-base/dist/AssetRegistry.js";
// import { getScopedVarName } from "@ui5/webcomponents-base/dist/CustomElementsScope.js";
// const customThemeLoader = theme => Promise.resolve(`:root {
// 	${getScopedVarName("--_ui5_button_base_height")}: 4rem;
// 	${getScopedVarName("--_ui5_button_base_padding")}: 2rem;
// }`);
// registerCustomThemePropertiesLoader("@ui5/webcomponents", "my_custom_theme", customThemeLoader);

// Uncomment to test the registration of custom properties and JSON bundles - use the TextArea test page
// import { registerI18nLoader } from "@ui5/webcomponents-base/dist/asset-registries/i18n.js";
// import parse from "@ui5/webcomponents-base/dist/PropertiesFileFormat.js";

// const bg = "https://sdk.openui5.org/resources/sap/ui/core/messagebundle_bg.properties";
// registerI18nLoader("@ui5/webcomponents", "bg", async (localeId) => {
// 	const props = await (await fetch(bg)).text();
// 	return parse(props);
// });
// registerI18nLoader("@ui5/webcomponents", "fr", async (localeId) => {
// 	return await (await fetch("fr")).json();
// });

// used in test pages
import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";
import { resetConfiguration } from "@ui5/webcomponents-base/dist/InitialConfiguration.js";

import { sanitizeHTML, URLListValidator } from "@ui5/webcomponents-base/dist/util/HTMLSanitizer.js";

import { getAnimationMode, setAnimationMode } from "@ui5/webcomponents-base/dist/config/AnimationMode.js";
import { getTheme, setTheme, isLegacyThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { getThemeRoot, setThemeRoot } from "@ui5/webcomponents-base/dist/config/ThemeRoot.js";
import { getTimezone, setTimezone } from "@ui5/webcomponents-base/dist/config/Timezone.js";
import { getLanguage, setLanguage } from "@ui5/webcomponents-base/dist/config/Language.js";
import getEffectiveIconCollection from "@ui5/webcomponents-base/dist/asset-registries/util/getIconCollectionByTheme.js";
import { setNoConflict } from "@ui5/webcomponents-base/dist/config/NoConflict.js";
import { getFirstDayOfWeek } from "@ui5/webcomponents-base/dist/config/FormatSettings.js";
import { _getRegisteredNames as getIconNames, getIconAccessibleName } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import applyDirection from "@ui5/webcomponents-base/dist/locale/applyDirection.js";
import { attachDirectionChange } from "@ui5/webcomponents-base/dist/locale/directionChange.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import announce from "@ui5/webcomponents-base/dist/util/InvisibleMessage.js";
import { ignoreCustomElements, shouldIgnoreCustomElement } from "@ui5/webcomponents-base/dist/IgnoreCustomElements.js";
import { startMultipleDrag } from "@ui5/webcomponents-base/dist/DragAndDrop.js";
import getElementSelection from "@ui5/webcomponents-base/dist/util/SelectionAssistant.js";

import * as defaultTexts from "./generated/i18n/i18n-defaults.js";

// OpenUI5Support.enablePolling = true;

setRuntimeAlias("UI5 Web Components Playground");

// @ts-ignore
window.sanitizeHTML = sanitizeHTML;
// @ts-ignore
window.URLListValidator = URLListValidator;

ignoreCustomElements("app-");
ignoreCustomElements("my-");

const testAssets = {
	resetConfiguration,
	configuration: {
		getAnimationMode,
		setAnimationMode,
		getTheme,
		setTheme,
		getThemeRoot,
		setThemeRoot,
		isLegacyThemeFamily,
		getLanguage,
		setLanguage,
		setNoConflict,
		getFirstDayOfWeek,
		getTimezone,
		setTimezone,
	},
	invisibleMessage: {
		announce,
	},
	getElementSelection,
	getLocaleData,
	applyDirection,
	attachDirectionChange,
	ResizeHandler,
	addCustomCSS,
	attachThemeLoaded,
	detachThemeLoaded,
	getIconNames,
	getIconAccessibleName,
	renderFinished,
	defaultTexts,
	getEffectiveIconCollection,
	ignoreCustomElements,
	shouldIgnoreCustomElement,
	startMultipleDrag,
};

// @ts-ignore
window["sap-ui-webcomponents-bundle"] = testAssets;

export default testAssets;
