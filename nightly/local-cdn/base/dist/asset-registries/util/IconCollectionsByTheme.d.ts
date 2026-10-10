declare enum RegisteredIconCollection {
    SAPIconsV4 = "SAP-icons-v4",
    SAPIconsV5 = "SAP-icons-v5",
    SAPIconsTNTV2 = "tnt-v2",
    SAPIconsTNTV3 = "tnt-v3",
    SAPBSIconsV1 = "business-suite-v1",
    SAPBSIconsV2 = "business-suite-v2"
}
type ThemeToCollectionMap = {
    [x: string]: string;
};
/**
 * Registers collection version per theme.
 * **For exmaple:** registerIconCollectionForTheme("my-custom-icons", {"sap_horizon": "my-custom-icons-v5"})
 * @param { string } collectionName
 * @param { ThemeToCollectionMap } themeCollectionMap
 */
declare const registerIconCollectionForTheme: (collectionName: string, themeCollectionMap: ThemeToCollectionMap) => void;
declare const getIconCollectionForTheme: (collectionName: string) => string;
export { registerIconCollectionForTheme, getIconCollectionForTheme, RegisteredIconCollection, };
