import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "map-navigation";
const pathData = "M99.81 163l134-152c6-7 14-11 22-11s17 4 23 11l133 152c20 23 6 62-23 62h-266c-28 0-42-39-23-62zm45 137h222l-111 127zm244-45h-266c-28 0-42 39-23 62l134 153c6 7 14 10 22 10s16-3 23-10l133-153c20-23 6-62-23-62z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/map-navigation";
export { pathData, ltr, accData };