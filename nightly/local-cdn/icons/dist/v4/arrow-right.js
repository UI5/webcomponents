import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "arrow-right";
const pathData = "M503 234q9 9 9 22.5t-9 22.5L344 439q-10 10-23 10t-23-10q-9-9-9-22.5t9-22.5l106-106H32q-13 0-22.5-9T0 256q0-13 9.5-22.5T32 224h372L299 119q-10-10-10-23t10-22q9-10 22-10t22 10z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/arrow-right";
export { pathData, ltr, accData };