import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "arrow-bottom";
const pathData = "M8 1a.75.75 0 0 1 .75.75v10.615l2.956-3.13a.75.75 0 0 1 1.09 1.03l-4.248 4.5a.757.757 0 0 1-1.09 0l-4.253-4.5a.75.75 0 1 1 1.09-1.03L7.25 12.36V1.75A.75.75 0 0 1 8 1Z";
const ltr = false;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v5/arrow-bottom";
export { pathData, ltr, viewBox, accData };