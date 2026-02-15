import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "arrow-left";
const pathData = "M169 74q9-10 22-10t22 10q10 9 10 22t-10 23L108 224h372q13 0 22.5 9.5T512 256q0 14-9.5 23t-22.5 9H108l106 106q9 9 9 22.5t-9 22.5q-10 10-23 10t-23-10L9 279q-9-9-9-22.5T9 234z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/arrow-left";
export { pathData, ltr, accData };