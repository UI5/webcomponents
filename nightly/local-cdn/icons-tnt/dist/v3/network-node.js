import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "network-node";
const pathData = "M256 511q-53 0-99.5-20T75 436.5t-55-81T0 256t20-100 55-81.5T156.5 20 256 0t99.5 20T437 74.5t55 81.5 20 100-20 99.5-55 81-81.5 54.5-99.5 20zm0-460q-42 0-79.5 16T111 111t-44 65.5T51 256t16 79.5 44 65 65.5 43.5 79.5 16 79.5-16 65.5-43.5 44-65 16-79.5-16-79.5-44-65.5-65.5-44T256 51zm119 332h-88q-8 0-13.5-5.5T268 364t5.5-14 13.5-6h42l-50-49q-6-6-6-14t6-14q6-5 14-5t13 5l50 50v-41q0-8 5.5-14t13.5-6 13.5 6 5.5 14v88q0 8-5.5 13.5T375 383zm-55-206q-6 0-14-6l-30-30v71q0 19-19 19-8 0-13.5-5.5T238 212v-70l-30 29q-4 6-13 6-8 0-14-6-5-5-5-13.5t5-13.5l62-63q5-5 14-5 10 0 14 5l63 63q5 5 5 13.5t-5 13.5q-7 6-14 6zm-95 209h-88q-8 0-14-5.5t-6-13.5v-88q0-8 6-14t14-6 13.5 6 5.5 14v42l50-50q6-6 13-6 8 0 14 6 6 5 5.5 13t-5.5 13l-49 50h41q8 0 13.5 6t5.5 14-5.5 13.5T225 386z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/network-node";
export { pathData, ltr, accData };