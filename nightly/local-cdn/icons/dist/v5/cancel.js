import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "cancel";
const pathData = "M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM2.905 3.966A6.5 6.5 0 0 0 8 14.5a6.469 6.469 0 0 0 4.033-1.406L2.905 3.966ZM8 1.5a6.47 6.47 0 0 0-4.034 1.405l9.128 9.128A6.469 6.469 0 0 0 14.5 8 6.5 6.5 0 0 0 8 1.5Z";
const ltr = true;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v5/cancel";
export { pathData, ltr, viewBox, accData };