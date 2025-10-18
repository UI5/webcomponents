import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "role";
const pathData = "M192 397q11 0 18 7t7 18-7 18.5-18 7.5H26q-11 0-18.5-7.5T0 422v-32q0-55 29-99.5t77-67.5q-42-39-42-95 0-27 10-50t27.5-40.5 41-27.5T192 0t49.5 10.5 41 28T310 79t10 49q0 27-11 52t-31 43q26 11 35 18 6 4 9 10t3 12q0 11-7.5 18t-18.5 7q-9 0-14-4-3-2-12.5-7t-21.5-9.5-26-8-27-3.5h-13q-28 0-52.5 10.5T90 295t-28.5 42.5T51 390v7h141zm0-346q-32 0-54.5 22.5T115 128t22.5 54.5T192 205t54.5-22.5T269 128t-22.5-54.5T192 51zm249 205q29 0 50 21t21 50q0 11-7.5 18.5T486 353t-18-7.5-7-18.5q0-8-6-14t-14-6-14 6-6 14v34q12 8 19.5 20.5T448 410v44q0 24-17 41t-41 17h-76q-24 0-41-17t-17-41v-44q0-24 17-41t41-17h56v-25q0-29 21-50t50-21zm-44 154q0-7-7-7h-76q-7 0-7 7v44q0 7 7 7h76q7 0 7-7v-44z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/role";
export { pathData, ltr, accData };