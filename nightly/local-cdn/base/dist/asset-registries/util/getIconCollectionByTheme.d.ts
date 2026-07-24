import type { IconCollection } from "../../config/Icons.js";
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
declare const getEffectiveIconCollection: (collectionName?: IconCollection) => IconCollection;
export default getEffectiveIconCollection;
