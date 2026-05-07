import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "sys-enter";
const pathData = "M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0Zm0 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13Zm1.68 4.262a.75.75 0 0 1 1.14.976l-3 3.5a.75.75 0 0 1-1.1.042l-1.5-1.5a.75.75 0 1 1 1.06-1.06l.927.926 2.474-2.884Z";
const ltr = true;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v5/sys-enter";
export { pathData, ltr, viewBox, accData };