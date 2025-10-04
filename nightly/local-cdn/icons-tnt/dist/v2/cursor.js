import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "cursor";
const pathData = "M471 380q9 9 9 22.5t-9 22.5l-46 45q-9 10-22 10-14 0-23-10L256 346v61q0 17-12 29t-29 12q-11 0-20.5-5.5T180 427l-2-4q-31-79-59-150-12-30-24.5-62t-24-61-21-54T33 53q-1-3-1-6 0-4 4-9.5T48 32q3 0 5 1 18 6 43 15.5t54.5 21 61 23.5 61.5 24q71 27 149 58l2 1h1q13 7 18 18t5 20q0 5-1 10-4 14-15 23t-25 9h-61zm-23 23L269 224h138q6 0 9-8v-3q0-6-5-8-1 0-18.5-7T347 180t-63.5-24.5-72.5-28T138.5 99 75 75q11 28 25 63.5t28.5 72.5 28.5 72.5 25 63.5 18 45.5 7 18.5h1q2 5 7 5 9 0 9-9V269l179 179z";
const ltr = false;
const accData = null;
const collection = "tnt-v2";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v2/cursor";
export { pathData, ltr, accData };