import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "goal";
const pathData = "M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0Zm0 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM8 3a5 5 0 1 1 0 10A5 5 0 0 1 8 3Zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7ZM8 6a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z";
const ltr = false;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v5/goal";
export { pathData, ltr, viewBox, accData };