import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "text-align-left";
const pathData = "M8.25 13.5a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1 0-1.5h6.5Zm6-4a.75.75 0 0 1 0 1.5H1.75a.75.75 0 0 1 0-1.5h12.5Zm-6-4.5a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1 0-1.5h6.5Zm6-4a.75.75 0 0 1 0 1.5H1.75a.75.75 0 0 1 0-1.5h12.5Z";
const ltr = true;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v5/text-align-left";
export { pathData, ltr, viewBox, accData };