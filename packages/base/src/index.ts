import type { JSX } from "./jsx-runtime.d.ts";

// animations/
import scroll from "./animations/scroll.js";
import slideDown from "./animations/slideDown.js";
import slideUp from "./animations/slideUp.js";

// config/
import { getAnimationMode, setAnimationMode } from "./config/AnimationMode.js";
import { getCalendarType } from "./config/CalendarType.js";
import { getFirstDayOfWeek, getLegacyDateCalendarCustomizing } from "./config/FormatSettings.js";
import {
	setDefaultIconCollection,
	getDefaultIconCollection,
} from "./config/Icons.js";
import { RegisteredIconCollection } from "./asset-registries/util/IconCollectionsByTheme.js";
import getEffectiveIconCollection from "./asset-registries/util/getIconCollectionByTheme.js";
import { startMultipleDrag } from "./DragAndDrop.js";
import {
	getLanguage,
	setLanguage,
	getDefaultLanguage,
	setFetchDefaultLanguage,
	getFetchDefaultLanguage,
} from "./config/Language.js";
import { getNoConflict, setNoConflict } from "./config/NoConflict.js";
import {
	getTheme,
	setTheme,
	getDefaultTheme,
	isLegacyThemeFamilyAsync,
} from "./config/Theme.js";

// decorators/
import customElement from "./decorators/customElement.js";
import event from "./decorators/event.js";
import eventStrict from "./decorators/event-strict.js";
import property from "./decorators/property.js";
import slot from "./decorators/slot.js";
import i18n from "./decorators/i18n.js";
import query from "./decorators/query.js";

// delegate/
import ItemNavigation from "./delegate/ItemNavigation.js";
import ResizeHandler from "./delegate/ResizeHandler.js";
import ScrollEnablement from "./delegate/ScrollEnablement.js";

// locale/
import applyDirection from "./locale/applyDirection.js";
import { attachDirectionChange, detachDirectionChange } from "./locale/directionChange.js";
import getEffectiveDir from "./locale/getEffectiveDir.js";
import { attachLanguageChange, detachLanguageChange } from "./locale/languageChange.js";

// util/
import { URLListValidator, sanitizeHTML } from "./util/HTMLSanitizer.js";

// Assets.ts
import { registerI18nLoader } from "./asset-registries/i18n.js";
import { registerLocaleDataLoader } from "./asset-registries/LocaleData.js";
import { registerThemePropertiesLoader } from "./asset-registries/Themes.js";
import { registerIconLoader, getIconAccessibleName, registerIcon } from "./asset-registries/Icons.js";

// Boot.ts
import { attachBoot } from "./Boot.js";

// CustomElementsScope.ts
import {
	setCustomElementsScopingSuffix,
	getCustomElementsScopingSuffix,
	setCustomElementsScopingRules,
	getCustomElementsScopingRules,
	getEffectiveScopingSuffixForTag,
} from "./CustomElementsScope.js";

// Device.ts
import {
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
import EventProvider from "./EventProvider.js";

// i18nBundle.ts
import I18nBundle, { getI18nBundle, registerCustomI18nBundleGetter } from "./i18nBundle.js";

// MediaRange.ts
import MediaRange from "./MediaRange.js";

// Render.ts
import {
	renderDeferred,
	renderImmediately,
	cancelRender,
	renderFinished,
} from "./Render.js";

// Theming.ts
import { addCustomCSS, attachThemeLoaded, detachThemeLoaded } from "./Theming.js";

// UI5Element.ts
import UI5Element from "./UI5Element.js";

export { jsx } from "./jsx-runtime.js";
export { useState } from "./thirdparty/preact/hooks.module.js";

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
export * as CustomElementsScopeUtils from "./CustomElementsScopeUtils.js";

export { default as getActiveElement } from "./util/getActiveElement.js";
export { default as getParentElement } from "./util/getParentElement.js";
export { getTabbableElements } from "./util/TabbableElements.js";
export { getFirstFocusableElement } from "./util/FocusableElements.js";
export { getLastFocusableElement } from "./util/FocusableElements.js";
export { default as DragRegistry } from "./util/dragAndDrop/DragRegistry.js";
export { default as DOMReferenceConverter } from "./converters/DOMReference.js";
export { default as clamp } from "./util/clamp.js";
export * as PopupUtils from "./util/PopupUtils.js";
export { instanceOfUI5Element } from "./UI5Element.js";
export * as ManagedStyles from "./ManagedStyles.js";
export { default as getSharedResource } from "./getSharedResource.js";
export { getFeature, registerFeature } from "./FeaturesRegistry.js";
export { default as isEventMarked } from "./util/isEventMarked.js";
export { default as getNormalizedTarget } from "./util/getNormalizedTarget.js";
export { default as isElementInView } from "./util/isElementInView.js";

// TODO: barrel?
export { findClosestPosition } from "./util/dragAndDrop/findClosestPosition.js";
export { findClosestPositionsByKey } from "./util/dragAndDrop/findClosestPosition.js";
export { isMovingKey } from "./util/dragAndDrop/findClosestPosition.js";

export { default as handleDragOver } from "./util/dragAndDrop/handleDragOver.js";
export { default as handleDrop } from "./util/dragAndDrop/handleDrop.js";
export { default as longDragOverHandler } from "./util/dragAndDrop/longDragOverHandler.js";

export { default as debounce } from "./util/debounce.js";
export { default as throttle } from "./util/throttle.js";
export * as Location from "./Location.js";
export { default as announce } from "./util/InvisibleMessage.js";
export { default as arraysAreEqual } from "./util/arraysAreEqual.js";
export * as valueStateNavigation from "./util/valueStateNavigation.js";
// @ts-expect-error
export { default as encodeXML } from "./sap/base/security/encodeXML.js";
export * as Caret from "./util/Caret.js";
export { default as generateHighlightedMarkup } from "./util/generateHighlightedMarkup.js";
export * as Illustrations from "./asset-registries/Illustrations.js";

export default UI5Element;
export {
	// drag and drop
	startMultipleDrag,

	// animations/
	scroll,
	slideDown,
	slideUp,

	// config/
	getAnimationMode,
	setAnimationMode,
	getCalendarType,
	getFirstDayOfWeek,
	getLegacyDateCalendarCustomizing,
	setDefaultIconCollection,
	getDefaultIconCollection,
	getEffectiveIconCollection,
	RegisteredIconCollection,
	getLanguage,
	setLanguage,
	getDefaultLanguage,
	setFetchDefaultLanguage,
	getFetchDefaultLanguage,
	getNoConflict,
	setNoConflict,
	getTheme,
	setTheme,
	getDefaultTheme,
	isLegacyThemeFamilyAsync,

	// decorators/
	customElement,
	event,
	eventStrict,
	property,
	slot,
	i18n,
	query,

	// delegate/
	ItemNavigation,
	ResizeHandler,
	ScrollEnablement,

	// locale/
	applyDirection,
	attachDirectionChange,
	detachDirectionChange,
	getEffectiveDir,
	attachLanguageChange,
	detachLanguageChange,

	// util/
	URLListValidator,
	sanitizeHTML,

	// Assets.ts
	registerI18nLoader,
	registerLocaleDataLoader,
	registerThemePropertiesLoader,
	registerIconLoader,
	getIconAccessibleName,
	registerIcon,

	// Boot.ts
	attachBoot,

	// CustomElementsScope.ts
	setCustomElementsScopingSuffix,
	getCustomElementsScopingSuffix,
	setCustomElementsScopingRules,
	getCustomElementsScopingRules,
	getEffectiveScopingSuffixForTag,

	// Device.ts
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

	// EventProvider.ts
	EventProvider,

	// i18nBundle.ts
	I18nBundle,
	getI18nBundle,
	registerCustomI18nBundleGetter,

	// MediaRange.ts
	MediaRange,

	// Render.ts
	renderDeferred,
	renderImmediately,
	cancelRender,
	renderFinished,

	// Theming.ts
	addCustomCSS,
	attachThemeLoaded,
	detachThemeLoaded,

	// UI5Element.ts
	UI5Element,
};

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
