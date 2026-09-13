import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "clear-all";
const pathData = "M7.246 1.005a.75.75 0 0 1 0 1.5H3.75c-.69 0-1.25.56-1.25 1.25v8.5c0 .69.56 1.25 1.25 1.25h8.5c.69 0 1.25-.56 1.25-1.25V8.75a.75.75 0 0 1 1.5 0v3.505a2.75 2.75 0 0 1-2.75 2.75h-8.5A2.75 2.75 0 0 1 1 12.255v-8.5a2.75 2.75 0 0 1 2.75-2.75h3.496Zm6.474.215a.75.75 0 1 1 1.06 1.06L13.56 3.5l1.22 1.22a.75.75 0 0 1-1.06 1.06L12.5 4.56l-1.22 1.22a.75.75 0 0 1-1.06-1.06l1.22-1.22-1.22-1.22a.75.75 0 0 1 1.06-1.06l1.22 1.22 1.22-1.22Z";
const ltr = false;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v5/clear-all";
export { pathData, ltr, viewBox, accData };