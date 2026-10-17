import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "pull-down";
const pathData = "M8 9a.75.75 0 0 1 .75.75v3.615l2.956-3.13a.75.75 0 0 1 1.09 1.03l-4.248 4.5a.757.757 0 0 1-1.09 0l-4.253-4.5a.75.75 0 1 1 1.09-1.03L7.25 13.36V9.75A.75.75 0 0 1 8 9Zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z";
const ltr = false;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v5/pull-down";
export { pathData, ltr, viewBox, accData };