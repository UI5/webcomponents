import { isLegacyThemeFamily } from "../../config/Theme.js";
var RegisteredIconCollection;
(function (RegisteredIconCollection) {
    RegisteredIconCollection["SAPIconsV4"] = "SAP-icons-v4";
    RegisteredIconCollection["SAPIconsV5"] = "SAP-icons-v5";
    RegisteredIconCollection["SAPIconsTNTV2"] = "tnt-v2";
    RegisteredIconCollection["SAPIconsTNTV3"] = "tnt-v3";
    RegisteredIconCollection["SAPBSIconsV1"] = "business-suite-v1";
    RegisteredIconCollection["SAPBSIconsV2"] = "business-suite-v2";
})(RegisteredIconCollection || (RegisteredIconCollection = {}));
const iconCollections = new Map();
iconCollections.set("SAP-icons", {
    "legacy": RegisteredIconCollection.SAPIconsV4,
    "sap_horizon": RegisteredIconCollection.SAPIconsV5,
});
iconCollections.set("tnt", {
    "legacy": RegisteredIconCollection.SAPIconsTNTV2,
    "sap_horizon": RegisteredIconCollection.SAPIconsTNTV3,
});
iconCollections.set("business-suite", {
    "legacy": RegisteredIconCollection.SAPBSIconsV1,
    "sap_horizon": RegisteredIconCollection.SAPBSIconsV2,
});
/**
 * Registers collection version per theme.
 * **For exmaple:** registerIconCollectionForTheme("my-custom-icons", {"sap_horizon": "my-custom-icons-v5"})
 * @param { string } collectionName
 * @param { ThemeToCollectionMap } themeCollectionMap
 */
const registerIconCollectionForTheme = (collectionName, themeCollectionMap) => {
    if (iconCollections.has(collectionName)) {
        iconCollections.set(collectionName, { ...themeCollectionMap, ...iconCollections.get(collectionName) });
        return;
    }
    iconCollections.set(collectionName, themeCollectionMap);
};
const getIconCollectionForTheme = (collectionName) => {
    const themeFamily = isLegacyThemeFamily() ? "legacy" : "sap_horizon";
    return iconCollections.has(collectionName) ? iconCollections.get(collectionName)[themeFamily] : collectionName;
};
export { registerIconCollectionForTheme, getIconCollectionForTheme, RegisteredIconCollection, };
//# sourceMappingURL=IconCollectionsByTheme.js.map