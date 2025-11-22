import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "collapse-all";
const pathData = "M267 204q12 12 0 23-11 11-22 0l-85-86v259q0 17-16 17t-16-17V139l-87 88q-11 11-23 0-11-11 0-23l102-103q10-10 23-10t22 10zM496 96q16 0 16 15 0 7-4.5 12t-11.5 5H336q-7 0-11.5-5t-4.5-12q0-15 16-15h160z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/collapse-all";
export { pathData, ltr, accData };