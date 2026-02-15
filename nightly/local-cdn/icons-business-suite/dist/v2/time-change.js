import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "time-change";
const pathData = "M89 2c40 0 71 32 71 72s-31 71-71 71-72-31-72-71S49 2 89 2zm258 310c-1 12-11 21-23 21h-83c-13 0-24-11-24-24s11-24 24-24h26l-95-95c-9-9-9-24 0-33 9-11 24-11 33 0l95 94v-25c0-13 11-24 24-24 15 0 24 11 24 24v83c0 1-1 0-1 3zm76 25c40 0 72 31 72 71s-32 72-72 72-71-32-71-72 31-71 71-71zm0 47c-13 0-24 9-24 24 0 13 11 24 24 24 15 0 24-11 24-24 0-15-9-24-24-24z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/time-change";
export { pathData, ltr, accData };