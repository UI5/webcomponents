import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "stock-warehouse";
const pathData = "M32.5 173c0-11 5-19 14-26l191-140c6-4 12-6 19-6s13 2 18 6l191 140c9 6 14 15 14 26v338h-32V192h-382v319h-33V173zm128 242h-64v-64h64v64zm191 96h-64v-64h64v64zm-159-383h128V96h-128v32zm0 319h64v64h-64v-64zm0-96h64v64h-64v-64zm-96 160v-64h64v64h-64zm0-192v-64h64v64h-64z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/stock-warehouse";
export { pathData, ltr, accData };