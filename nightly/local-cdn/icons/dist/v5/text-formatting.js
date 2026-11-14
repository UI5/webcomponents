import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "text-formatting";
const pathData = "M8.25 2a.75.75 0 0 1 0 1.5h-3v9.75a.75.75 0 0 1-1.5 0V3.5h-3a.75.75 0 0 1 0-1.5h7.5Zm3.5 0a.75.75 0 0 1 .75.75V5.5h1.75a.75.75 0 0 1 0 1.5H12.5v4.25c0 .69.56 1.25 1.25 1.25h1.5a.75.75 0 0 1 0 1.5h-1.5A2.75 2.75 0 0 1 11 11.25V7H9.75a.75.75 0 0 1 0-1.5H11V2.75a.75.75 0 0 1 .75-.75Z";
const ltr = true;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v5/text-formatting";
export { pathData, ltr, viewBox, accData };