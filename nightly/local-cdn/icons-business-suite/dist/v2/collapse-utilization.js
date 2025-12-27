import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "collapse-utilization";
const pathData = "M35.25 480c-13 0-24-11-24-24V26c0-13 11-24 24-24s24 11 24 24v120h95c13 0 24 8 24 23v72h72c13 0 24 11 24 24v72h48v-96c0-13 11-24 24-24h119c13 0 24 11 24 24v215c0 14-10 24-24 24h-430zm24-48h382V265h-72v96c0 13-8 23-23 23h-96c-13 0-24-10-24-23v-72h-72c-13 0-24-11-24-24v-72h-71v239zm283-331c-10-11-10-23 0-34l58-58c0-1 1-2 2-2 3-1 3-1 6-4 1-1 4-1 9-1s8 0 9 1c3 3 3 3 8 6l59 58c10 11 10 23 0 34-4 4-10 8-17 8s-14-4-18-8l-17-18v70c0 13-11 24-24 24s-24-11-24-24V83l-17 18c-7 4-11 8-18 8s-12-4-16-8z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/collapse-utilization";
export { pathData, ltr, accData };