import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "composition";
const pathData = "M464 32q16 0 16 16v160q0 16-16 16t-16-16V86L255 280q1 4 1.5 6.5t.5 3.5q0 3-1 6l-23 133q-3 25-28 28-51 9-78.5 13.5t-41 6.5-16 2.5-3.5.5q-15 0-24.5-11T32 445v-5l23-133q3-24 28-29l133-22h8q6 0 8 1L425 64H304q-16 0-16-16t16-16h160z";
const ltr = false;
const accData = null;
const collection = "tnt-v2";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v2/composition";
export { pathData, ltr, accData };