import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "tag";
const pathData = "M231 143l25-26 166 166-25 27zm-26 26l115 114-26 27-115-116zm199 199q15 0 26 10t11 25-11 25.5-26 10.5q-14 0-25-10.5T368 403t11-25 25-10zm108-91v219q0 7-5 11.5t-11 4.5H277q-6 0-11-5L12 253q-5-5-5-11t5-11L231 11q5-5 12-5 6 0 11 5l253 254q5 5 5 12zm-35 8L243 50 52 242l234 234h191V285z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/tag";
export { pathData, ltr, accData };