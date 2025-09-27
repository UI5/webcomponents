import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "intersection";
const pathData = "M0 272c0-83 68-150 150-150 43 0 79 17 106 45 27-28 63-45 106-45 83 0 150 67 150 150 0 82-67 149-150 149-43 0-78-15-106-44-28 29-63 44-106 44C68 421 0 354 0 272zm362 98c54 0 98-44 98-98 0-53-44-99-98-99-31 0-57 15-76 38 8 19 13 38 13 61s-5 41-13 60c19 23 45 38 76 38zm-212 0c31 0 57-14 76-37-8-19-13-38-13-61s5-42 13-61c-19-23-45-38-76-38-53 0-99 46-99 99 0 54 46 98 99 98z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/intersection";
export { pathData, ltr, accData };