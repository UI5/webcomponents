import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "bullet-text";
const pathData = "M1 12a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm14.25 0a.75.75 0 0 1 0 1.5H4.75a.75.75 0 0 1 0-1.5h10.5ZM1 7a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm14.25 0a.75.75 0 0 1 0 1.5H4.75a.75.75 0 0 1 0-1.5h10.5ZM1 2a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm14.25 0a.75.75 0 0 1 0 1.5H4.75a.75.75 0 0 1 0-1.5h10.5Z";
const ltr = true;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v5/bullet-text";
export { pathData, ltr, viewBox, accData };