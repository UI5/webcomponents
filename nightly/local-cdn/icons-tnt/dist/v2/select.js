import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "select";
const pathData = "M471.5 380q9 9 9 22.5t-9 22.5l-46 45q-9 10-22 10-14 0-23-10l-124-124v61q0 17-12 29t-29 12q-11 0-20.5-5.5T180.5 427l-2-4q-31-79-59-150-12-30-24.5-62t-24-61-21-54-16.5-43q-1-3-1-6 0-4 4-9.5t12-5.5q3 0 5 1 18 6 43 15.5t54.5 21T212 93t61.5 24q71 27 149 58l2 1h1q13 7 18 18t5 20q0 5-1 10-4 14-15 23t-25 9h-61z";
const ltr = false;
const accData = null;
const collection = "tnt-v2";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v2/select";
export { pathData, ltr, accData };