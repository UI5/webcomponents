import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "arrow-left";
const pathData = "M181 103q7-7 17-7 11 0 18.5 7.5T224 122q0 10-8 18l-94 90h332q11 0 18.5 7.5T480 256t-7.5 18.5T454 282H122l94 90q8 8 8 18 0 11-7.5 18.5T198 416q-10 0-17-7L40 274q-8-6-8-18 0-11 8-19z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/arrow-left";
export { pathData, ltr, accData };