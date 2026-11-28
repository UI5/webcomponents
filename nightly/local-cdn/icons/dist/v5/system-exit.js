import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "system-exit";
const pathData = "M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0Zm0 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM8 8a.75.75 0 0 1 .558.248l2.25 2.5a.75.75 0 0 1-1.116 1.004L8 9.872l-1.692 1.88a.75.75 0 0 1-1.116-1.004l2.25-2.5A.75.75 0 0 1 8 8Zm0-4a.75.75 0 0 1 .558.248l2.25 2.5a.75.75 0 0 1-1.116 1.004L8 5.872l-1.692 1.88a.75.75 0 0 1-1.116-1.004l2.25-2.5A.75.75 0 0 1 8 4Z";
const ltr = false;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v5/system-exit";
export { pathData, ltr, viewBox, accData };