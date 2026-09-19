import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "resize-corner";
const pathData = "M11.72 3.22a.75.75 0 1 1 1.06 1.06l-8.5 8.5a.75.75 0 1 1-1.06-1.06l8.5-8.5Zm0 5a.75.75 0 1 1 1.06 1.06l-3.5 3.5a.75.75 0 1 1-1.06-1.06l3.5-3.5Z";
const ltr = false;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v5/resize-corner";
export { pathData, ltr, viewBox, accData };