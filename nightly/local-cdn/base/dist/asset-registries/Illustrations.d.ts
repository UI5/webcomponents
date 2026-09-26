import type { I18nText } from "../i18nBundle.js";
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
    title: I18nText;
    /** The illustration subtitle text (supports i18n) */
    subtitle: I18nText;
};
/**
 * Illustration properties using template functions (recommended).
 *
 * @public
 */
type IllustrationProperties = IllustrationDatabase & {
    /** Template function for the medium variant (M breakpoint, ≤ 681px) */
    dialogTemplate?: TemplateFunction;
    /** Template function for the large variant (L breakpoint, > 681px) */
    sceneTemplate?: TemplateFunction;
    /** Template function for the small variant (S breakpoint, ≤ 360px) */
    spotTemplate?: TemplateFunction;
    /** Template function for the extra small variant (XS breakpoint, ≤ 260px) */
    dotTemplate?: TemplateFunction;
};
/**
 * Illustration properties using raw SVG strings (unsafe).
 *
 * @public
 */
type UnsafeIllustrationProperties = IllustrationDatabase & {
    /** SVG content for the medium variant (M breakpoint, ≤ 681px) */
    dialogSvg: string;
    /** SVG content for the large variant (L breakpoint, > 681px) */
    sceneSvg: string;
    /** SVG content for the small variant (S breakpoint, ≤ 360px) */
    spotSvg: string;
    /** SVG content for the extra small variant (XS breakpoint, ≤ 260px) */
    dotSvg: string;
};
/**
 * Complete illustration data for registration (recommended).
 *
 * @public
 */
type IllustrationData = IllustrationProperties & {
    /** The illustration set identifier (e.g., "custom") */
    set: string;
    /** Collection identifier (defaults to "V4") */
    collection?: string;
};
/**
 * Complete unsafe illustration data for registration.
 *
 * @public
 */
type UnsafeIllustrationData = UnsafeIllustrationProperties & {
    /** The illustration set identifier (e.g., "custom") */
    set: string;
    /** Collection identifier (defaults to "V4") */
    collection?: string;
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
declare const registerIllustration: (name: string, data: IllustrationData) => void;
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
declare const unsafeRegisterIllustration: (name: string, data: UnsafeIllustrationData) => void;
declare const registerIllustrationLoader: (illustrationName: string, loader: IllustrationLoader) => void;
/**
 * Synchronously retrieves illustration data from the registry.
 *
 * @param illustrationName - The illustration identifier in format "set/name"
 * @returns The illustration properties or undefined if not available
 *
 * @public
 */
declare const getIllustrationDataSync: (illustrationName: string) => UnsafeIllustrationProperties | IllustrationProperties | undefined;
/**
 * Asynchronously retrieves illustration data, loading it if necessary.
 *
 * @param illustrationName - The illustration identifier in format "set/name"
 * @returns Promise resolving to illustration properties or undefined
 *
 * @public
 */
declare const getIllustrationData: (illustrationName: string) => Promise<UnsafeIllustrationProperties | IllustrationProperties | undefined>;
export { getIllustrationDataSync, registerIllustration, unsafeRegisterIllustration, registerIllustrationLoader, getIllustrationData, };
export type { IllustrationData, UnsafeIllustrationData, IllustrationProperties, UnsafeIllustrationProperties, };
