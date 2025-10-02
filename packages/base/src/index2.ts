import type { JSX } from "./jsx-runtime.d.ts";
import type UI5Element from "./UI5Element.js";

// animations/
export { default as scroll } from "./animations/scroll.js";
export { default as slideDown } from "./animations/slideDown.js";
export { default as slideUp } from "./animations/slideUp.js";

// config/
export { getAnimationMode, setAnimationMode } from "./config/AnimationMode.js";
export { getCalendarType } from "./config/CalendarType.js";
export { getFirstDayOfWeek, getLegacyDateCalendarCustomizing } from "./config/FormatSettings.js";
export {
	setDefaultIconCollection,
	getDefaultIconCollection,
} from "./config/Icons.js";
export { RegisteredIconCollection } from "./asset-registries/util/IconCollectionsByTheme.js";
export { default as getEffectiveIconCollection } from "./asset-registries/util/getIconCollectionByTheme.js";
export { startMultipleDrag } from "./DragAndDrop.js";
export {
	getLanguage,
	setLanguage,
	getDefaultLanguage,
	setFetchDefaultLanguage,
	getFetchDefaultLanguage,
} from "./config/Language.js";
export { getNoConflict, setNoConflict } from "./config/NoConflict.js";
export {
	getTheme,
	setTheme,
	getDefaultTheme,
} from "./config/Theme.js";

// decorators/
export { default as customElement } from "./decorators/customElement.js";
export { default as event } from "./decorators/event.js";
export { default as eventStrict } from "./decorators/event-strict.js";
export { default as property } from "./decorators/property.js";
export { default as slot } from "./decorators/slot.js";
export { default as i18n } from "./decorators/i18n.js";

// delegate/
export { default as ItemNavigation } from "./delegate/ItemNavigation.js";
export { default as ResizeHandler } from "./delegate/ResizeHandler.js";
export { default as ScrollEnablement } from "./delegate/ScrollEnablement.js";

// locale/
export { default as applyDirection } from "./locale/applyDirection.js";
export { attachDirectionChange, detachDirectionChange } from "./locale/directionChange.js";
export { default as getEffectiveDir } from "./locale/getEffectiveDir.js";
export { attachLanguageChange, detachLanguageChange } from "./locale/languageChange.js";

// util/
export { URLListValidator, sanitizeHTML } from "./util/HTMLSanitizer.js";

// Assets.ts
export { registerI18nLoader } from "./asset-registries/i18n.js";
export { registerLocaleDataLoader } from "./asset-registries/LocaleData.js";
export { registerThemePropertiesLoader } from "./asset-registries/Themes.js";
export { registerIconLoader, getIconAccessibleName } from "./asset-registries/Icons.js";

// Boot.ts
export { attachBoot } from "./Boot.js";

// CustomElementsScope.ts
export {
	setCustomElementsScopingSuffix,
	getCustomElementsScopingSuffix,
	setCustomElementsScopingRules,
	getCustomElementsScopingRules,
	getEffectiveScopingSuffixForTag,
} from "./CustomElementsScope.js";

// Device.ts
export {
	supportsTouch,
	isSafari,
	isChrome,
	isFirefox,
	isPhone,
	isTablet,
	isDesktop,
	isCombi,
	isIOS,
	isAndroid,
} from "./Device.js";

// EventProvider.ts
export { default as EventProvider } from "./EventProvider.js";

// i18nBundle.ts
export { default as I18nBundle, getI18nBundle, registerCustomI18nBundleGetter } from "./i18nBundle.js";

// MediaRange.ts
export { default as MediaRange } from "./MediaRange.js";

// Render.ts
export {
	renderDeferred,
	renderImmediately,
	cancelRender,
	renderFinished,
} from "./Render.js";
export * as CustomElementsScopeUtils from "./CustomElementsScopeUtils.js";

// Theming.ts
export { addCustomCSS, attachThemeLoaded, detachThemeLoaded } from "./Theming.js";

// UI5Element.ts
export { default as UI5Element } from "./UI5Element.js";

export { default as jsxRenderer } from "./renderer/JsxRenderer.js";
export * as AccessibilityTextsHelper from "./util/AccessibilityTextsHelper.js";
export * as Keys from "./Keys.js";
export { default as willShowContent } from "./util/willShowContent.js";
export * as Device from "./Device.js";
export * as Tooltips from "./config/Tooltips.js";
export { default as toLowercaseEnumValue } from "./util/toLowercaseEnumValue.js";
export * as InputElementsFormSupport from "./features/InputElementsFormSupport.js";
export * as Icons from "./asset-registries/Icons.js";
export { default as executeTemplate } from "./renderer/executeTemplate.js";

type TargetedCustomEvent<D, T> = Omit<CustomEvent<D>, "currentTarget"> & { currentTarget: T };
// export type UI5NativeEvent<T extends keyof HTMLElementTagNameMap, N> = Parameters<JSX.IntrinsicElements[T][N]>[0];
export type UI5CustomEvent<T extends UI5Element, N extends keyof T["eventDetails"]> = TargetedCustomEvent<T["eventDetails"][N], T>;
export type JsxTemplateResult = JSX.Element | void;
export type JsxTemplate = () => JsxTemplateResult;

export type * from "./types.d.ts";
export type * from "./jsx-runtime.d.ts";
export type { ITabbable } from "./delegate/ItemNavigation.js";
export type { I18nText } from "./i18nBundle.js";
export type { IconData, UnsafeIconData } from "./asset-registries/Icons.js";
