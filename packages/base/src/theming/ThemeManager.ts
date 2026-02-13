import { getTheme } from "../config/Theme.js";
import { attachThemeLoaded } from "./ThemeLoaded.js";
import getConstructableStyle from "./getConstructableStyle.js";
import { getComponentStyles } from "./componentStyles.js";
import { getEffectiveScopingSuffixForTag } from "../CustomElementsScopeUtils.js";
import type UI5Element from "../UI5Element.js";

type ParametersLoader = (themeName: string) => Promise<string>;

type ParametersKey = string;

const parametersLoaders = new Map<string, Array<ParametersLoader>>();
const parametersSheets = new Map<ParametersLoader, CSSStyleSheet>();
const parametersSheetThemes = new Map<ParametersLoader, string>();
const parametersLoadPromises = new Map<ParametersLoader, Promise<void>>();
const parametersLoadErrors = new Map<ParametersLoader, Set<ParametersKey>>();

const instances = new Set<UI5Element>();

const buildKey = (tagName: string, themeName: string) => `${tagName}:${themeName}`;

const loadParametersIntoSheet = (loader: ParametersLoader, tagName: string, themeName: string, sheet: CSSStyleSheet) => {
	if (parametersSheetThemes.get(loader) === themeName && !parametersLoadPromises.has(loader)) {
		return;
	}

	if (parametersLoadPromises.has(loader) && parametersSheetThemes.get(loader) === themeName) {
		return;
	}

	const key = buildKey(tagName, themeName);
	const loadPromise = loader(themeName)
		.then(cssText => {
			sheet.replaceSync(cssText);
		})
		.catch(error => {
			let loaderErrors = parametersLoadErrors.get(loader);
			if (!loaderErrors) {
				loaderErrors = new Set<ParametersKey>();
				parametersLoadErrors.set(loader, loaderErrors);
			}

			if (!loaderErrors.has(key)) {
				loaderErrors.add(key);
				// eslint-disable-next-line no-console
				console.warn(`[UI5] Failed to load theme parameters for ${tagName} (${themeName})`, error);
			}
		})
		.finally(() => {
			parametersLoadPromises.delete(loader);
		});

	parametersSheetThemes.set(loader, themeName);
	parametersLoadPromises.set(loader, loadPromise);
};

const getParametersSheets = (tagName: string, themeName = getTheme()) => {
	const loaders = parametersLoaders.get(tagName);
	if (!loaders || !loaders.length) {
		return [] as Array<CSSStyleSheet>;
	}

	return loaders.map(loader => {
		let sheet = parametersSheets.get(loader);
		if (!sheet) {
			sheet = new CSSStyleSheet();
			parametersSheets.set(loader, sheet);
		}

		loadParametersIntoSheet(loader, tagName, themeName, sheet);
		return sheet;
	});
};

const getParametersSheet = (tagName: string, themeName = getTheme()) => {
	return getParametersSheets(tagName, themeName)[0];
};

const applyParametersToInstance = (instance: UI5Element, themeName: string) => {
	const ctor = instance.constructor as typeof UI5Element;
	const tagName = ctor.getMetadata().getTag();
	const parametersSheetsForTag = getParametersSheets(tagName, themeName);
	const shadowRoot = instance.shadowRoot;

	instance._parametersStyleSheet = parametersSheetsForTag;

	if (!shadowRoot) {
		return;
	}

	shadowRoot.adoptedStyleSheets = [getComponentStyles(), ...parametersSheetsForTag, ...getConstructableStyle(ctor)];
};

const registerParametersLoader = (tagName: string, loader: ParametersLoader) => {
	const loaders = parametersLoaders.get(tagName);
	if (loaders) {
		loaders.push(loader);
		return;
	}
	parametersLoaders.set(tagName, [loader]);
};

const registerParametersLoaderForTag = (tagName: string, loader: ParametersLoader) => {
	registerParametersLoader(tagName, loader);
	const suffix = getEffectiveScopingSuffixForTag(tagName);
	if (suffix) {
		registerParametersLoader(`${tagName}-${suffix}`, loader);
	}
};

const registerParametersLoadersForTag = (tagName: string, loaders: Array<ParametersLoader>) => {
	loaders.forEach(loader => registerParametersLoaderForTag(tagName, loader));
};

const registerThemeInstance = (instance: UI5Element) => {
	instances.add(instance);
};

const unregisterThemeInstance = (instance: UI5Element) => {
	instances.delete(instance);
};

attachThemeLoaded(themeName => {
	instances.forEach(instance => applyParametersToInstance(instance, themeName));
});

export {
	registerParametersLoader,
	registerParametersLoaderForTag,
	registerParametersLoadersForTag,
	getParametersSheets,
	getParametersSheet,
	registerThemeInstance,
	unregisterThemeInstance,
};
