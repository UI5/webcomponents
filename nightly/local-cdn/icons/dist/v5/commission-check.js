import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "commission-check";
const pathData = "M7 1a6 6 0 0 1 4.738 9.678l3.042 3.042a.75.75 0 1 1-1.06 1.06l-3.042-3.042A6 6 0 1 1 7 1Zm0 1.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9ZM9 8a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm-.53-3.53a.75.75 0 1 1 1.06 1.06l-4 4a.75.75 0 1 1-1.06-1.06l4-4ZM5 4a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z";
const ltr = true;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v5/commission-check";
export { pathData, ltr, viewBox, accData };