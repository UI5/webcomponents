import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "high-priority";
const pathData = "M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0Zm0 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm0-8a1 1 0 0 0-1 1v5a1 1 0 0 0 2 0V4a1 1 0 0 0-1-1Z";
const ltr = false;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v5/high-priority";
export { pathData, ltr, viewBox, accData };