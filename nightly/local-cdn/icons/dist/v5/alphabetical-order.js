import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "alphabetical-order";
const pathData = "M486 333q11 0 18.5 7t7.5 18-7.5 18.5T486 384H346q-11 0-18.5-7.5T320 358q0-9 4-14l114-165h-92q-11 0-18.5-7.5T320 153t7.5-18 18.5-7h140q11 0 18.5 7.5T512 153q0 8-5 15L394 333h92zM73 320l-25 50q-6 14-22 14-11 0-18.5-7.5T0 358q0-7 3-11l102-205q6-14 23-14t23 14l102 205q3 4 3 11 0 11-7.5 18.5T230 384q-15 0-23-14l-24-50H73zm26-51h58l-29-58zM218 96q-11 0-18.5-7.5T192 70q0-10 6-16l39-45q6-9 19-9t19 9l39 45q6 6 6 16 0 11-7.5 18.5T294 96h-76zm76 320q11 0 18.5 7.5T320 441q0 9-6 17l-39 45q-6 9-19 9t-19-9l-39-45q-6-8-6-17 0-10 7.5-17.5T218 416h76z";
const ltr = true;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/alphabetical-order";
export { pathData, ltr, accData };