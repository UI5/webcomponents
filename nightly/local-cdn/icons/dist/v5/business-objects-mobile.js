import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "business-objects-mobile";
const pathData = "M198 512H26q-11 0-18.5-7.5T0 486V26Q0 15 7.5 7.5T26 0h172q11 0 18.5 7.5T224 26v460q0 11-7.5 18.5T198 512zm288-288H314q-11 0-18.5-7.5T288 198V26q0-11 7.5-18.5T314 0h172q11 0 18.5 7.5T512 26v172q0 11-7.5 18.5T486 224zM51 461h122V51H51v410zm288-288h122V51H339v122zm61 339q-48 0-80-32t-32-80 32-80 80-32 80 32 32 80-32 80-80 32zm0-173q-26 0-43.5 17.5T339 400t17.5 43.5T400 461t43.5-17.5T461 400t-17.5-43.5T400 339z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/business-objects-mobile";
export { pathData, ltr, accData };