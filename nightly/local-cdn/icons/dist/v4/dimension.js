import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "dimension";
const pathData = "M15 4.563v6.875L6.916 16V9.125L15 4.562ZM8.084 2.938l-5.81 3.28v3.907L0 11.438V4.561L8.084 0v2.938Zm3.474 2.25-5.81 3.28v3.938l-2.306 1.281V6.875l8.116-4.594v2.906Z";
const ltr = false;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v4/dimension";
export { pathData, ltr, viewBox, accData };