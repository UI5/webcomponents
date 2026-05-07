import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "record";
const pathData = "M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0Zm0 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM8 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z";
const ltr = false;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v5/record";
export { pathData, ltr, viewBox, accData };