import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "tree";
const pathData = "M11.25 1a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-.75.75h-2.5v2H13c.966 0 1.75.784 1.75 1.75V11h.5a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1-.75-.75v-2.5a.75.75 0 0 1 .75-.75h.5V9.75A.25.25 0 0 0 13 9.5H8.75V11h.5a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1-.75-.75v-2.5a.75.75 0 0 1 .75-.75h.5V9.5H3a.25.25 0 0 0-.25.25V11h.5a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-.75.75H.75a.75.75 0 0 1-.75-.75v-2.5A.75.75 0 0 1 .75 11h.5V9.75C1.25 8.784 2.034 8 3 8h4.25V6h-2.5A.75.75 0 0 1 4 5.25v-3.5A.75.75 0 0 1 4.75 1h6.5ZM1.5 13.5h1v-1h-1v1Zm6 0h1v-1h-1v1Zm6 0h1v-1h-1v1Zm-8-9h5v-2h-5v2Z";
const ltr = false;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v5/tree";
export { pathData, ltr, viewBox, accData };