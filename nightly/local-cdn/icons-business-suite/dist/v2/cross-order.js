import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "cross-order";
const pathData = "M35 471c-10-11-10-23 0-34L443 29c5-5 10-7 17-7s12 2 17 7c9 9 9 24 0 33L68 471c-5 5-10 7-16 7-5 0-11-2-17-7zM6 250c0-35 27-63 62-63 27 0 49 16 58 39h79l-31 47h-48c-9 23-31 39-58 39-35 0-62-27-62-62zm379 23h-79l32-47h47c11-23 31-39 58-39 35 0 63 28 63 63s-28 62-63 62c-27 0-47-16-58-39z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/cross-order";
export { pathData, ltr, accData };