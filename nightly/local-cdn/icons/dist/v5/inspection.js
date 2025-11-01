import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "inspection";
const pathData = "M390 0q11 0 18.5 7.5T416 26v109q0 11-7.5 18.5T390 161t-18-7.5-7-18.5V51H212l-20 23v67q0 21-15 36t-36 15H91l-8 9v260h84q11 0 18.5 7t7.5 18-7.5 18.5T167 512H58q-11 0-18.5-7.5T32 486V192q0-10 6-17L181 9q6-9 19-9h190zm83 469q7 7 7 17 0 11-7.5 18.5T454 512q-10 0-18-8l-67-69q-20 13-49 13-41 0-68.5-27.5T224 352t27.5-68.5T320 256t68.5 27.5T416 352q0 24-11 46zm-153-72q20 0 32.5-12.5T365 352q0-19-12.5-32T320 307q-19 0-32 13t-13 32q0 20 13 32.5t32 12.5z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/inspection";
export { pathData, ltr, accData };