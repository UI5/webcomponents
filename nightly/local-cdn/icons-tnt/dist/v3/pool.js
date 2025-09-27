import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "pool";
const pathData = "M418 511H159q-27 0-45-24t-18-59V83q0-35 18-59t45-24h259q26 0 44 24t18 59v345q0 35-18 59t-44 24zm-105-51h105q2 0 6.5-8.5T429 428V102H313v358zm-154 0h103V102H147v326q0 15 4.5 23.5t7.5 8.5z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/pool";
export { pathData, ltr, accData };