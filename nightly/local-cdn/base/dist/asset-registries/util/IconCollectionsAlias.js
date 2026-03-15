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
var IconCollectionsAlias;
(function (IconCollectionsAlias) {
    IconCollectionsAlias["SAP-icons"] = "SAP-icons-v4";
    IconCollectionsAlias["horizon"] = "SAP-icons-v5";
    IconCollectionsAlias["SAP-icons-TNT"] = "tnt";
    IconCollectionsAlias["BusinessSuiteInAppSymbols"] = "business-suite";
})(IconCollectionsAlias || (IconCollectionsAlias = {}));
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
const getIconCollectionByAlias = (collectionName) => {
    if (IconCollectionsAlias[collectionName]) {
        return IconCollectionsAlias[collectionName];
    }
    return collectionName;
};
export default IconCollectionsAlias;
export { getIconCollectionByAlias, };
//# sourceMappingURL=IconCollectionsAlias.js.map