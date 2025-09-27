import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "target";
const pathData = "M457.5 328c15 0 26 11 26 26v50c0 43-32 76-75 76h-304c-43 0-76-33-76-76v-50c0-15 10-26 25-26s26 11 26 26v50c0 15 10 25 25 25h304c15 0 24-10 24-25v-50c0-15 10-26 25-26zm-221 15l-99-98c-12-12-12-24 0-36 11-12 23-12 35 0l59 59V25c0-17 8-25 25-25 16 0 24 8 24 25v243l59-59c12-12 24-12 35 0 12 12 12 24 0 36l-98 98c-5 7-9 11-20 11s-13-4-20-11z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/target";
export { pathData, ltr, accData };