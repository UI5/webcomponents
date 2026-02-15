import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "arrow-bottom";
const pathData = "M103 331q-7-7-7-17 0-11 7.5-18.5T122 288q10 0 18 8l90 94V58q0-11 7.5-18.5T256 32t18.5 7.5T282 58v332l90-94q8-8 18-8 11 0 18.5 7.5T416 314q0 10-7 17L275 472q-8 8-19 8-12 0-18-8z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/arrow-bottom";
export { pathData, ltr, accData };