import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "bottle";
const pathData = "M90 252c0-31 12-61 35-84l29-29c5-4 7-9 7-16v-6h-24c-13 0-23-9-23-22V24c0-15 10-25 23-25h236c15 0 23 10 23 25v71c0 15-8 22-23 22h-23v6c0 5 3 11 9 16l28 29c23 24 35 52 35 84v157c0 39-33 71-72 71H161c-39 0-71-32-71-71V252zm47 157c0 13 11 24 24 24h189c15 0 25-11 25-24V252c0-19-7-35-22-50l-28-29c-15-13-21-31-21-50v-6h-96v6c0 18-7 35-21 50l-28 29c-15 12-22 31-22 50v157zm20-365v22h198V44H157z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/bottle";
export { pathData, ltr, accData };