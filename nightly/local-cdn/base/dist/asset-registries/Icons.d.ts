import type { I18nText } from "../i18nBundle.js";
import type { TemplateFunction } from "../renderer/executeTemplate.js";
type IconLoader = (collectionName: string) => Promise<CollectionData | Array<CollectionData>>;
type CollectionData = {
    collection: string;
    packageName: string;
    themeFamily?: "legacy" | "sap_horizon";
    version?: string;
    data: Record<string, {
        path?: string;
        paths?: Array<string>;
        ltr?: boolean;
        acc?: I18nText;
    }>;
};
type IconDatabase = {
    collection: string;
    packageName?: string;
    viewBox?: string;
    ltr?: boolean;
    accData?: I18nText;
};
type IconData = IconDatabase & {
    pathData?: string | string[];
    customTemplate?: TemplateFunction;
};
type UnsafeIconData = IconDatabase & {
    customTemplateAsString: string;
};
declare const registerIconLoader: (collectionName: string, loader: IconLoader) => void;
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
declare const registerIcon: (name: string, iconData: IconData) => void;
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
declare const unsafeRegisterIcon: (name: string, iconData: UnsafeIconData) => void;
declare const getIconDataSync: (iconName: string) => IconData | UnsafeIconData | undefined;
declare const getIconData: (iconName: string) => Promise<IconData | UnsafeIconData | "ICON_NOT_FOUND" | undefined>;
/**
 * Returns the accessible name for the given icon,
 * or undefined if accessible name is not present.
 *
 * @param { string } name
 * @return { Promise }
 */
declare const getIconAccessibleName: (name: string | undefined) => Promise<string | undefined>;
declare const _getRegisteredNames: () => Promise<string[]>;
export { registerIconLoader, getIconData, getIconDataSync, getIconAccessibleName, registerIcon, unsafeRegisterIcon, _getRegisteredNames, };
export type { IconData, UnsafeIconData, CollectionData, };
