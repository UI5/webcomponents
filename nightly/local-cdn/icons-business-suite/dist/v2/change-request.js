import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "change-request";
const pathData = "M91.5 49v384h331V49h-331zm353 431h-376c-13 0-24-11-24-24V26c0-13 11-24 24-24h376c15 0 24 11 24 24v430c0 13-9 24-24 24zm-134-235l-102 103c-5 5-10 7-17 7h-31c-8 0-12-4-12-12l1-30c0-7 2-12 7-17l103-102c5-5 11-8 16-8 6 0 12 3 17 8l18 18c9 9 9 24 0 33zm41-111l19 19c9 9 9 23 0 32l-12 12c-11 10-22 10-32 0l-19-19c-11-9-11-21 0-32l12-12c9-9 23-9 32 0z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/change-request";
export { pathData, ltr, accData };