import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "information";
const pathData = "M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0Zm0 7a1 1 0 0 0-1 1v4a1 1 0 1 0 2 0V8a1 1 0 0 0-1-1Zm0-4a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z";
const ltr = false;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v5/information";
export { pathData, ltr, viewBox, accData };