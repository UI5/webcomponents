import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "log";
const pathData = "M3.86 1.153a.75.75 0 0 1 .778 1.284 6.5 6.5 0 1 0 6.728.002.75.75 0 0 1 .778-1.283 8 8 0 1 1-8.283-.003ZM8 0a.75.75 0 0 1 .75.75v6.5a.75.75 0 0 1-1.5 0V.75A.75.75 0 0 1 8 0Z";
const ltr = false;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v5/log";
export { pathData, ltr, viewBox, accData };