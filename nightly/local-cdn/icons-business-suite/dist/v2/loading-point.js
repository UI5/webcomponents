import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "loading-point";
const pathData = "M255 337c-12 0-22-10-22-22s10-23 22-23h46v-92c0-12 11-23 23-23h89c9 0 16 5 21 14l48 115c1 2 1 5 1 8v41c0 39-31 67-68 67h-24c-7 33-34 58-67 58-39 0-67-31-67-68 0-39 28-69 67-69 25 0 47 15 59 35h32c12 0 23-11 23-23v-18H255zM29 457V163c0-8 3-14 8-18L195 8c4-4 9-5 14-5 6 0 13 3 17 7l96 95c11 9 11 23 0 32-5 5-10 7-16 7-5 0-10-2-16-7l-80-80L75 172v262h68V231c0-12 11-23 23-23h76c12 0 23 11 23 23s-11 23-23 23h-54v203c0 12-10 23-22 23H52c-12 0-23-11-23-23zm368-234h-51v69h81zm-96 189c0 12 11 22 23 22s22-10 22-22-10-23-22-23-23 11-23 23z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/loading-point";
export { pathData, ltr, accData };