import { getTheme } from "../../config/Theme.js";
import { getDefaultIconCollection } from "../../config/Icons.js";
import { getIconCollectionByAlias } from "./IconCollectionsAlias.js";
import { getIconCollectionForTheme } from "./IconCollectionsByTheme.js";
/**
 * Returns the effective theme dependant icon collection:
 *
 * - "no collection" resolves to "SAP-icons-v4" in "Quartz" and to "SAP-icons-v5" in "Horizon"
 * - "tnt" (and its alias "SAP-icons-TNT") resolves to "tnt-v2" in "Quartz" and resolves to "tnt-v3" in "Horizon"
 * - "business-suite" (and its alias "BusinessSuiteInAppSymbols") resolves to "business-suite-v1" in "Quartz" and resolves to "business-suite-v2" in "Horizon"
 *
 * @param { IconCollection } collectionName
 * @returns { IconCollection } the effective collection name
 */
const getEffectiveIconCollection = (collectionName) => {
    const defaultIconCollection = getDefaultIconCollection(getTheme());
    // no collection + default collection, configured via setDefaultIconCollection - return the configured icon collection.
    if (!collectionName && defaultIconCollection) {
        return getIconCollectionByAlias(defaultIconCollection);
    }
    // no collection - return "SAP-icons-v4" or  "SAP-icons-v5".
    if (!collectionName) {
        return getIconCollectionForTheme("SAP-icons");
    }
    // has collection - return "SAP-icons-v4", "SAP-icons-v5", "tnt-v1", "tnt-v2", "business-suite-v1", "business-suite-v2", or custom ones.
    return getIconCollectionForTheme(collectionName);
};
export default getEffectiveIconCollection;
//# sourceMappingURL=getIconCollectionByTheme.js.map