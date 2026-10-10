import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "paging";
const pathData = "M10.25 11.5a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5h7.5Zm3-4.25a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1 0-1.5h10.5Zm0-4.25a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1 0-1.5h10.5Z";
const ltr = false;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v5/paging";
export { pathData, ltr, viewBox, accData };