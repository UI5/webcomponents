type IconCollection = string;
/**
 * Sets the default icon collection for a given theme.
 *
 * SAP Icons is the default icon collection (that resolves to SAP-icons version 5.x in Horizon theme family and SAP-icons version 4.x in all other themes)
 * and to display icons from other collections, you have to specify the icon collection in addition to the icon name, for example: "tnt/actor", "business-suite/1x2-grid-layout", etc.
 * This method allows setting another (built-in or custom) icon collection as default per theme.
 *
 * **Usage**
 * **For example**, to make "SAP-icons version 5.x" the default icon collection in "sap_fiori_3":
 *
 * ```
 * setDefaultIconCollection("sap_fiori_3", "SAP-icons-v5");
 *
 * <ui5-icon name="home"></ui5-icon>
 * ```
 *
 * **For example**, to make a custom icon collection (with name "my-custom-collection") the default icon collection in "sap_fiori_3":
 *
 * ```
 * setDefaultIconCollection("sap_fiori_3", "my-custom-collection");
 *
 * <ui5-icon name="custom-icon-name"></ui5-icon>
 * ```
 *
 * @public
 * @param { string } theme
 * @param { string } collectionName
 */
declare const setDefaultIconCollection: (theme: string, collectionName: IconCollection) => void;
/**
 * Returns the configured default icon collection for a given theme.
 *
 * @param { string } theme
 * @public
 * @returns { string | undefined }
 */
declare const getDefaultIconCollection: (theme: string) => string | undefined;
export { setDefaultIconCollection, getDefaultIconCollection, };
export type { IconCollection, };
