import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "activity";
const pathData = "M55.5 175v151h401V175h-401zm0-50h401c28 0 51 22 51 50v151c0 27-23 50-51 50h-401c-28 0-51-23-51-50V175c0-28 23-50 51-50zm377 175h-353V200h353v100z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/activity";
export { pathData, ltr, accData };