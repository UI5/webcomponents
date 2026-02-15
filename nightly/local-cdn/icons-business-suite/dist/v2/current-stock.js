import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "current-stock";
const pathData = "M245.5 9c5-6 15-6 20 0l190 226c4 5 4 11 0 16l-190 229c-5 6-15 6-20 0l-190-229c-3-5-3-11 0-16z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/current-stock";
export { pathData, ltr, accData };