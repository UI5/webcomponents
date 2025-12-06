import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "send-task";
const pathData = "M510 143q0 2 .5 4.5t.5 5.5v237q0 37-26 64t-64 27H89q-38 0-64-27t-26-64V153q0-2 .5-4t.5-5l50 33 164 102q18 12 40 12t40-12l164-102zm-247 88q-9 5-19 0L24 91q12-13 28.5-20.5T89 63h332q20 0 36.5 7.5T486 90l-59 39z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/send-task";
export { pathData, ltr, accData };