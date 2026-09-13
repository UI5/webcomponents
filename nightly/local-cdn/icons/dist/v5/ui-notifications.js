import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "ui-notifications";
const pathData = "M13.25 2A2.75 2.75 0 0 1 16 4.75v6.5A2.75 2.75 0 0 1 13.25 14H2.75A2.75 2.75 0 0 1 0 11.25v-6.5A2.75 2.75 0 0 1 2.75 2h10.5ZM2.75 3.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H2.75ZM8.246 8a.75.75 0 1 1 0 1.5H4.75a.75.75 0 0 1 0-1.5h3.496Zm3.004-3a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1 0-1.5h6.5Z";
const ltr = false;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v5/ui-notifications";
export { pathData, ltr, viewBox, accData };