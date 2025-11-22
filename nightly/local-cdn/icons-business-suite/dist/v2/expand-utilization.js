import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "expand-utilization";
const pathData = "M35.125 480c-13 0-24-11-24-24V25c0-13 11-24 24-24s24 11 24 24v121h95c13 0 24 9 24 22v73h72c15 0 24 9 24 24v72h49v-96c0-15 9-24 22-24h121c13 0 24 9 24 24v215c0 14-10 24-24 24h-431zm24-287v239h383V265h-73v96c0 13-9 23-24 23h-95c-13 0-24-10-24-23v-72h-72c-13 0-24-11-24-24v-72h-71zm282-82c-9-9-9-24 0-33 6-6 12-8 18-8 7 0 13 2 17 8l17 17V25c0-13 11-24 24-24 15 0 25 11 25 24v70l17-17c5-6 11-8 17-8s13 2 18 8c9 9 9 24 0 33l-59 59c-1 1-2 1-3 1-1 1-4 3-5 4-2 1-5 1-10 1-3 0-6 0-9-1-1-1-4-3-5-4-1 0-2 0-3-1z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/expand-utilization";
export { pathData, ltr, accData };