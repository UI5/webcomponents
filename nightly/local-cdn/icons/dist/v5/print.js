import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "print";
const pathData = "M12.24 0a.75.75 0 0 1 .75.75V3h.26A2.75 2.75 0 0 1 16 5.75v4.5A2.75 2.75 0 0 1 13.25 13H13v2.248a.75.75 0 0 1-.75.75h-8.5a.75.75 0 0 1-.75-.75V13h-.25A2.75 2.75 0 0 1 0 10.25v-4.5A2.75 2.75 0 0 1 2.75 3h.24V.75A.75.75 0 0 1 3.74 0h8.5ZM4.5 14.498h7V9.5h-7v4.998ZM2.75 4.5c-.69 0-1.25.56-1.25 1.25v4.5c0 .69.56 1.25 1.25 1.25H3V8.75A.75.75 0 0 1 3.75 8h8.5a.75.75 0 0 1 .75.75v2.75h.25c.69 0 1.25-.56 1.25-1.25v-4.5c0-.69-.56-1.25-1.25-1.25H2.75ZM4.49 3h7V1.5h-7V3Z";
const ltr = false;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v5/print";
export { pathData, ltr, viewBox, accData };