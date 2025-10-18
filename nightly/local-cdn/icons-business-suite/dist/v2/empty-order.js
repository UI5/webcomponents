import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "empty-order";
const pathData = "M428 122c43 0 78 35 78 78s-35 78-78 78c-35 0-63-23-74-54H158c-11 31-39 54-74 54-43 0-78-35-78-78s35-78 78-78c35 0 63 23 74 55h196c11-32 39-55 74-55zM84 247c27 0 47-20 47-47s-20-47-47-47-47 20-47 47 20 47 47 47zm344 0c27 0 47-20 47-47s-20-47-47-47-47 20-47 47 20 47 47 47z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/empty-order";
export { pathData, ltr, accData };