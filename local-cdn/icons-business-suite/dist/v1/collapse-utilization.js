import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "collapse-utilization";
const pathData = "M17 480V0h31v224h112v80h112v64h80v-96h144v208H17zM352 96h-48l96-96 96 96h-48l-24-24v96h-48V72zM48 448h416V304h-80v96H240v-64H128v-80H48v192z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/collapse-utilization";
export { pathData, ltr, accData };