import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "blank-tag";
const pathData = "M512 277v219q0 7-5 11.5t-11 4.5H277q-6 0-11-5L12 253q-5-5-5-11t5-11L231 11q5-5 12-5 6 0 11 5l253 254q5 5 5 12zm-35 8L243 50 52 242l234 234h191V285zm-72 83q17 0 25.5 11t8.5 24.5-8.5 24.5-25.5 11q-15 0-26-10.5T368 403t11-25 26-10z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/blank-tag";
export { pathData, ltr, accData };