import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "attachment-text-file";
const pathData = "M48 480V128L176 0h256q14 0 23 9.5t9 22.5v448q0 14-8.5 23t-22.5 9H81q-14 0-23.5-9T48 480zm385 0l-1-448H208v96q0 14-9 23t-23 9H80v320h353zm-65-288v32h-96v192h-32V224h-96v-32h224z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/attachment-text-file";
export { pathData, ltr, accData };