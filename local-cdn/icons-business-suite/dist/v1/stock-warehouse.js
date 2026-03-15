import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "stock-warehouse";
const pathData = "M274.5 7l191 140c9 6 14 15 14 26v338h-32V192h-382v319h-33V173c0-11 5-19 14-26l191-140c6-4 12-6 19-6s13 2 18 6zm46 121V96h-128v32h128zm-160 127v64h-64v-64h64zm0 96v64h-64v-64h64zm96 0v64h-64v-64h64zm-96 96v64h-64v-64h64zm96 0v64h-64v-64h64zm95 0v64h-64v-64h64z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/stock-warehouse";
export { pathData, ltr, accData };