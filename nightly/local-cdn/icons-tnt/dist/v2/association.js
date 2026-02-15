import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "association";
const pathData = "M424 64H303q-16 0-16-16t16-16h160q7 0 12 4.5t5 11.5v160q0 7-5 11.5t-12 4.5q-6 0-10.5-4.5T448 208V86L59 475q-5 5-12 5-6 0-11-5t-5-11 5-11z";
const ltr = false;
const accData = null;
const collection = "tnt-v2";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v2/association";
export { pathData, ltr, accData };