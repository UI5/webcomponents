import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "utilization";
const pathData = "M40 480c-13 0-24-11-24-24V24C16 11 27 0 40 0c15 0 24 11 24 24v120h95c15 0 25 9 25 24v72h72c13 0 24 11 24 24v73h48v-97c0-13 11-24 24-24h120c13 0 24 11 24 24v216c0 14-10 24-24 24H40zm95-288H64v240h384V264h-73v97c0 13-8 23-23 23h-96c-15 0-24-10-24-23v-73h-73c-13 0-22-9-22-24z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/utilization";
export { pathData, ltr, accData };