import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "compare";
const pathData = "M486 461q11 0 18.5 7t7.5 18-7.5 18.5T486 512H26q-11 0-18.5-7.5T0 486t7.5-18 18.5-7h205V122q-25-11-35-39h-58v32l26 63q20 49 24.5 69.5T193 277q0 30-23.5 52.5T113 352t-56.5-22.5T33 277q0-5 1-11.5t4-18 8.5-28T62 178l25-60V58q0-11 7.5-18.5T113 32h89q8-14 22.5-23T257 0t32.5 9T312 32h88q11 0 18.5 7.5T426 58v59l25 61q20 49 24.5 69.5T480 277q0 30-23.5 52.5T400 352t-56.5-22.5T320 277q0-5 1-11.5t4-18 8.5-28T349 178l26-63V83h-57q-9 27-36 40v338h204zm-62-205l-24-68-24 68h48zm-287 0l-24-68-24 68h48z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/compare";
export { pathData, ltr, accData };