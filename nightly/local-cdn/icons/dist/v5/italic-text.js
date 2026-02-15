import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "italic-text";
const pathData = "M304 32q20 0 34 14t14 34-14 34-34 14-34-14-14-34 14-34 34-14zm-79 448q-27 0-46-22.5T160 407q0-5 1-10.5t3-10.5l62-175h-40q-11 0-18.5-7t-7.5-18 7.5-18.5T186 160h76q11 0 18.5 7.5T288 186q0 2-2 8l-74 208q-1 2-1 6 0 8 5.5 14.5T231 429q11 0 18 7t7 18-8 18.5-23 7.5z";
const ltr = true;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/italic-text";
export { pathData, ltr, accData };