import getSharedResource from "../getSharedResource.js";
import type { I18nText } from "../i18nBundle.js";
import { getTheme } from "../config/Theme.js";
import type { TemplateFunction } from "../renderer/executeTemplate.js";

/**
 * Loader function for lazy-loading illustration data.
 */
type IllustrationLoader = (illustrationName: string) => Promise<UnsafeIllustrationData>;

/**
 * Database properties shared by all illustration types.
 */
type IllustrationDatabase = {
	/** The illustration title text (supports i18n) */
	title: I18nText,
	/** The illustration subtitle text (supports i18n) */
	subtitle: I18nText,
};

/**
 * Illustration properties using template functions (recommended).
 *
 * @public
 */
type IllustrationProperties = IllustrationDatabase & {
	/** Template function for the medium variant (M breakpoint, ≤ 681px) */
	dialogTemplate?: TemplateFunction,
	/** Template function for the large variant (L breakpoint, > 681px) */
	sceneTemplate?: TemplateFunction,
	/** Template function for the small variant (S breakpoint, ≤ 360px) */
	spotTemplate?: TemplateFunction,
	/** Template function for the extra small variant (XS breakpoint, ≤ 260px) */
	dotTemplate?: TemplateFunction,
};

/**
 * Illustration properties using raw SVG strings (unsafe).
 *
 * @public
 */
type UnsafeIllustrationProperties = IllustrationDatabase & {
	/** SVG content for the medium variant (M breakpoint, ≤ 681px) */
	dialogSvg: string,
	/** SVG content for the large variant (L breakpoint, > 681px) */
	sceneSvg: string,
	/** SVG content for the small variant (S breakpoint, ≤ 360px) */
	spotSvg: string,
	/** SVG content for the extra small variant (XS breakpoint, ≤ 260px) */
	dotSvg: string,
};

/**
 * Complete illustration data for registration (recommended).
 *
 * @public
 */
type IllustrationData = IllustrationProperties & {
	/** The illustration set identifier (e.g., "custom") */
	set: string,
	/** Collection identifier (defaults to "V4") */
	collection?: string,
};

/**
 * Complete unsafe illustration data for registration.
 *
 * @public
 */
type UnsafeIllustrationData = UnsafeIllustrationProperties & {
	/** The illustration set identifier (e.g., "custom") */
	set: string,
	/** Collection identifier (defaults to "V4") */
	collection?: string,
};

const IllustrationCollections = new Map([
	["sap_horizon", "V5"],
	["sap_horizon_dark", "V5"],
	["sap_horizon_hcb", "V5/HC"],
	["sap_horizon_hcw", "V5/HC"],
]);

const FALLBACK_COLLECTION = "V4";

const loaders = new Map<string, IllustrationLoader>();
const registry = getSharedResource<Map<string, IllustrationProperties | UnsafeIllustrationProperties>>("SVGIllustration.registry", new Map());
const illustrationPromises = getSharedResource<Map<string, Promise<UnsafeIllustrationData>>>("SVGIllustration.promises", new Map());

const getCollection = () => {
	const theme = getTheme();

	if (IllustrationCollections.has(theme)) {
		return IllustrationCollections.get(theme);
	}

	return FALLBACK_COLLECTION;
};

/**
 * Processes the name of the illustration
 * The name is used to generate the registry key and the loader key
 * The registry key is used to store and get the illustration data from the registry
 * The loader key is used to store and get the illustration loader from the loaders map
 * The function generates the correct registry key and loader key based on whether an loader exists for the illustration
 * If there is no loader registered for the collection, it falls back to the default collection
 */
const processName = (name: string) => {
	let collection = getCollection();
	const [set, illustrationName] = name.split("/");
	let registryKey = `${set}/${collection}/${illustrationName}`;

	if (!loaders.has(registryKey) && collection !== FALLBACK_COLLECTION) {
		collection = FALLBACK_COLLECTION;
		registryKey = `${set}/${collection}/${illustrationName}`;
	}

	return {
		registryKey,
		collection,
	};
};

/**
 * Registers a custom illustration in the global registry using template functions.
 *
 * This is the recommended way to register illustrations as it accepts template functions
 * instead of raw SVG strings, preventing XSS vulnerabilities.
 *
 * @param name - The name of the illustration (without set prefix)
 * @param data - The illustration data (see {@link IllustrationData})
 *
 * @public
 * @since 2.17.0
 * @example
 * ```js
 * import { registerIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
 *
 * registerIllustration("EmptyCart", {
 *   sceneTemplate: (component) => <svg>...</svg>,
 *   dialogTemplate: (component) => <svg>...</svg>,
 *   spotTemplate: (component) => <svg>...</svg>,
 *   dotTemplate: (component) => <svg>...</svg>,
 *   title: "Your cart is empty",
 *   subtitle: "Add items to get started",
 *   set: "custom"
 * });
 * ```
 */
const registerIllustration = (name: string, data: IllustrationData) => {
	const collection = data.collection || FALLBACK_COLLECTION;
	registry.set(`${data.set}/${collection}/${name}`, {
		dialogTemplate: data.dialogTemplate,
		sceneTemplate: data.sceneTemplate,
		spotTemplate: data.spotTemplate,
		dotTemplate: data.dotTemplate,
		title: data.title,
		subtitle: data.subtitle,
	});
};

/**
 * Registers a custom illustration in the global registry.
 *
 * <b>Note:</b> This method is unsafe as it allows the SVG content to be passed as raw strings
 * through the `dialogSvg`, `sceneSvg`, `spotSvg`, and `dotSvg` properties of the `data`.
 * Ensure that the SVG content is properly validated.
 * Improperly sanitized SVG strings can lead to security vulnerabilities such as XSS (Cross-Site Scripting).
 *
 * @param name - The name of the illustration (without set prefix)
 * @param data - The illustration data (see {@link UnsafeIllustrationData})
 *
 * @public
 * @since 2.17.0
 * @example
 * ```js
 * import { unsafeRegisterIllustration } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
 *
 * unsafeRegisterIllustration("EmptyCart", {
 *   sceneSvg: "<svg>...</svg>",
 *   dialogSvg: "<svg>...</svg>",
 *   spotSvg: "<svg>...</svg>",
 *   dotSvg: "<svg>...</svg>",
 *   title: "Your cart is empty",
 *   subtitle: "Add items to get started",
 *   set: "custom"
 * });
 * ```
 */
const unsafeRegisterIllustration = (name: string, data: UnsafeIllustrationData) => {
	const collection = data.collection || FALLBACK_COLLECTION;
	registry.set(`${data.set}/${collection}/${name}`, {
		dialogSvg: data.dialogSvg,
		sceneSvg: data.sceneSvg,
		spotSvg: data.spotSvg,
		dotSvg: data.dotSvg,
		title: data.title,
		subtitle: data.subtitle,
	});
};

const registerIllustrationLoader = (illustrationName: string, loader: IllustrationLoader) => {
	loaders.set(illustrationName, loader);
};

const _loadIllustrationOnce = (illustrationName: string) => {
	const { registryKey } = processName(illustrationName);
	if (!illustrationPromises.has(registryKey)) {
		if (!loaders.has(registryKey)) {
			const illustrationPath = illustrationName.startsWith("fiori/") ? illustrationName.replace("fiori/", "") : illustrationName;
			throw new Error(`No loader registered for the ${illustrationName} illustration. Probably you forgot to import the "@ui5/webcomponents-fiori/dist/illustrations/${illustrationPath}.js" module. Or you can import the "@ui5/webcomponents-fiori/dist/illustrations/AllIllustrations.js" module that will make all illustrations available, but fetch only the ones used.`);
		}

		const loadIllustrations = loaders.get(registryKey)!;
		illustrationPromises.set(registryKey, loadIllustrations(registryKey));
	}
	return illustrationPromises.get(registryKey);
};

/**
 * Synchronously retrieves illustration data from the registry.
 *
 * @param illustrationName - The illustration identifier in format "set/name"
 * @returns The illustration properties or undefined if not available
 *
 * @public
 */
const getIllustrationDataSync = (illustrationName: string) => {
	const { registryKey } = processName(illustrationName);
	return registry.get(registryKey);
};

/**
 * Asynchronously retrieves illustration data, loading it if necessary.
 *
 * @param illustrationName - The illustration identifier in format "set/name"
 * @returns Promise resolving to illustration properties or undefined
 *
 * @public
 */
const getIllustrationData = async (illustrationName: string) => {
	const { registryKey } = processName(illustrationName);

	await _loadIllustrationOnce(illustrationName);
	return registry.get(registryKey);
};

export {
	getIllustrationDataSync,
	registerIllustration,
	unsafeRegisterIllustration,
	registerIllustrationLoader,
	getIllustrationData,
};

export type {
	IllustrationData,
	UnsafeIllustrationData,
	IllustrationProperties,
	UnsafeIllustrationProperties,
};
