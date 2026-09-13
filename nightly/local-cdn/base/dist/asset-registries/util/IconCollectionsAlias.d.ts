/**
 * Supported icon collection aliases.
 *
 * Users might specify a collection, using both the key and the value in the following key-value pairs,
 * e.g the following pairs are completely exchangeable:
 *
 * - "SAP-icons/accept" and "SAP-icons-v4/accept"
 * - "horizon/accept" and "SAP-icons-v5/accept"
 * - "SAP-icons-TNT/actor" and "tnt/actor"
 * - "BusinessSuiteInAppSymbols/3d" and "business-suite/3d"
 */
declare enum IconCollectionsAlias {
    "SAP-icons" = "SAP-icons-v4",
    "horizon" = "SAP-icons-v5",
    "SAP-icons-TNT" = "tnt",
    "BusinessSuiteInAppSymbols" = "business-suite"
}
/**
 * Returns the collection name for a given alias:
 *
 * - "SAP-icons-TNT"resolves to "tnt"
 * - "BusinessSuiteInAppSymbols" resolves to "business-suite"
 * - "horizon" resolves to "SAP-icons-v5"
 *
 * @param { string } collectionName
 * @return { string } the normalized collection name
 */
declare const getIconCollectionByAlias: (collectionName: string) => string;
export default IconCollectionsAlias;
export { getIconCollectionByAlias, };
