import getSharedResource from "../getSharedResource.js";
import { getIconCollectionByAlias } from "./util/IconCollectionsAlias.js";
import { registerIconCollectionForTheme } from "./util/IconCollectionsByTheme.js";
import getEffectiveIconCollection from "./util/getIconCollectionByTheme.js";
import { getI18nBundle } from "../i18nBundle.js";
import type { I18nText } from "../i18nBundle.js";
import type { TemplateFunction } from "../renderer/executeTemplate.js";

const DEFAULT_THEME_FAMILY = "legacy"; // includes sap_fiori_*

type IconLoader = (collectionName: string) => Promise<CollectionData | Array<CollectionData>>;

type CollectionData = {
	collection: string,
	packageName: string,
	themeFamily?: "legacy" | "sap_horizon",
	version?: string,
	data: Record<string, {
		path?: string,
		paths?: Array<string>,
		ltr?: boolean,
		acc?: I18nText,
	}>,
};

type IconDatabase = {
	collection: string;
	packageName?: string;
	viewBox?: string;
	ltr?: boolean;
	accData?: I18nText;
}

type IconData = IconDatabase & {
	pathData?: string | string[];
	customTemplate?: TemplateFunction;
};

type UnsafeIconData = IconDatabase & {
	customTemplateAsString: string;
};

const loaders = new Map<string, IconLoader>();
const registry = getSharedResource<Map<string, IconData | UnsafeIconData>>("SVGIcons.registry", new Map());
const iconCollectionPromises = getSharedResource<Map<string, Promise<CollectionData| Array<CollectionData>>>>("SVGIcons.promises", new Map());

const ICON_NOT_FOUND = "ICON_NOT_FOUND";

const registerIconLoader = (collectionName: string, loader: IconLoader) => {
	loaders.set(collectionName, loader);
};

const _loadIconCollectionOnce = async (collectionName: string) => {
	if (!iconCollectionPromises.has(collectionName)) {
		if (!loaders.has(collectionName)) {
			throw new Error(`No loader registered for the ${collectionName} icons collection. Probably you forgot to import the "AllIcons.js" module for the respective package.`);
		}

		const loadIcons = loaders.get(collectionName)!;
		iconCollectionPromises.set(collectionName, loadIcons(collectionName));
	}

	return iconCollectionPromises.get(collectionName);
};

const _fillRegistry = (bundleData: CollectionData) => {
	Object.keys(bundleData.data).forEach(iconName => {
		const iconData = bundleData.data[iconName];

		registerIcon(iconName, {
			pathData: (iconData.path || iconData.paths)!,
			ltr: iconData.ltr,
			accData: iconData.acc,
			collection: bundleData.collection,
			packageName: bundleData.packageName,
		});
	});
};

/**
 * Registers a SVG icon with the given name and associated icon data.
 *
 * This method is used to add an icon to the registry, making it available for use
 * in the application.
 *
 * @public
 * @param { string } name - The name of the icon to register.
 * @param { IconData } iconData - The data associated with the icon: `collection`, `pathData`, `packageName`
 * `customTemplate`, `viewBox`, `ltr`, `accData`.
 *
 * <b>Note:</b> Properties `pathData` and `customTemplate` are mutually exclusive.
 * If both are set, `customTemplate` will be used.
 */
const registerIcon = (name: string, iconData: IconData) => { // eslint-disable-line
	const key = `${iconData.collection}/${name}`;

	const data: IconData = {
		collection: iconData.collection,
		packageName: iconData.packageName,
		pathData: iconData.pathData,
		viewBox: iconData.viewBox,
		ltr: iconData.ltr,
		accData: iconData.accData,
		customTemplate: iconData.customTemplate,
	};

	registry.set(key, data);
};

/**
 * Registers a SVG icon in the registry with the given name and icon data.
 *
 * <b>Note:</b> This method is unsafe as it allows the SVG content to be passed as a string
 * through the `customTemplateAsString` property of the `iconData`.
 * Ensure that the SVG content is properly validated.
 * Improperly sanitized SVG strings can lead to security vulnerabilities such as XSS (Cross-Site Scripting).
 *
 * @public
 * @param { string } name - The name of the icon to register.
 * @param { UnsafeIconData } iconData - The data for the icon: `collection`, `customTemplateAsString`, `packageName`
 * `viewBox`, `ltr` and `accData`.
 * @since 2.14.0
 */
const unsafeRegisterIcon = (name: string, iconData: UnsafeIconData) => {
	const key = `${iconData.collection}/${name}`;

	const data: UnsafeIconData = {
		collection: iconData.collection,
		customTemplateAsString: iconData.customTemplateAsString,
		packageName: iconData.packageName,
		viewBox: iconData.viewBox,
		ltr: iconData.ltr,
		accData: iconData.accData,
	};

	registry.set(key, data);
};

/**
 * Processes the full icon name and splits it into - "name", "collection".
 * - removes legacy protocol ("sap-icon://")
 * - resolves aliases (f.e "SAP-icons-TNT/actor" => "tnt/actor")
 *
 * @param { string } name
 * @return { object }
 */
const processName = (name: string) => {
	// silently support ui5-compatible URIs
	if (name.startsWith("sap-icon://")) {
		name = name.replace("sap-icon://", "");
	}

	let collection: string;
	[name, collection] = name.split("/").reverse();

	name = name.replace("icon-", "");
	if (collection) {
		collection = getIconCollectionByAlias(collection);
	}
	return { name, collection };
};

const getIconDataSync = (iconName: string) => {
	const { name, collection } = processName(iconName);
	return getRegisteredIconData(collection, name);
};

const getIconData = async (iconName: string) => {
	const { name, collection } = processName(iconName);

	let iconData: string | CollectionData | Array<CollectionData> = ICON_NOT_FOUND;
	try {
		iconData = (await _loadIconCollectionOnce(getEffectiveIconCollection(collection)))!;
	} catch (error: unknown) {
		const e = error as Error;
		console.error(e.message); /* eslint-disable-line */
	}

	if (iconData === ICON_NOT_FOUND) {
		return iconData;
	}

	const registeredIconData = getRegisteredIconData(collection, name);

	if (registeredIconData) {
		return registeredIconData;
	}

	// not filled by another await. many getters will await on the same loader, but fill only once
	if (Array.isArray(iconData)) {
		iconData.forEach(data => {
			_fillRegistry(data);
			registerIconCollectionForTheme(collection, { [data.themeFamily || DEFAULT_THEME_FAMILY]: data.collection });
		});
	} else {
		_fillRegistry(iconData as CollectionData);
	}

	return getRegisteredIconData(collection, name);
};

const getRegisteredIconData = (collection: string, name: string) => {
	const registryKey = `${getEffectiveIconCollection(collection)}/${name}`;
	return registry.get(registryKey);
};

/**
 * Returns the accessible name for the given icon,
 * or undefined if accessible name is not present.
 *
 * @param { string } name
 * @return { Promise }
 */
const getIconAccessibleName = async (name: string | undefined): Promise<string | undefined> => {
	if (!name) {
		return;
	}

	let iconData: typeof ICON_NOT_FOUND | IconData | undefined = getIconDataSync(name);

	if (!iconData) {
		iconData = await getIconData(name);
	}

	if (iconData && iconData !== ICON_NOT_FOUND && iconData.accData) {
		if (iconData.packageName) {
			const i18nBundle = await getI18nBundle(iconData.packageName);
			return i18nBundle.getText(iconData.accData);
		}
		return iconData.accData?.defaultText || "";
	}
};

// test page usage only
const _getRegisteredNames = async () => {
	// fetch one icon of each collection to trigger the bundle load
	await getIconData("edit");
	await getIconData("tnt/arrow");
	await getIconData("business-suite/3d");
	return Array.from(registry.keys());
};

export {
	registerIconLoader,
	getIconData,
	getIconDataSync,
	getIconAccessibleName,
	registerIcon,
	unsafeRegisterIcon,
	_getRegisteredNames,
};

export type {
	IconData,
	UnsafeIconData,
	CollectionData,
};
