import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "line-chart";
const pathData = "M154 192q-11 0-18.5-7.5T128 166q0-16 15-23l103-45q6-2 10-2 6 0 8 1l82 28 91-86q7-7 17-7 11 0 18.5 7.5T480 58q0 10-8 18l-102 97q-9 7-18 7-2 0-8-2l-87-29-93 41q-6 2-10 2zm300 288H58q-11 0-18.5-7.5T32 454V58q0-11 7.5-18.5T58 32t18 7.5T83 58v371h371q11 0 18.5 7t7.5 18-7.5 18.5T454 480zM154 288q-11 0-18.5-7.5T128 262q0-8 4.5-14.5T145 238l102-38q6-2 9-2 2 0 3.5.5t3.5.5l89 25 95-31q2-1 7-1 11 0 18.5 7.5T480 218q0 17-18 24l-102 33q-6 2-8 2t-3.5-.5-3.5-.5l-88-25-94 35q-6 2-9 2zm0 96q-11 0-18.5-7.5T128 358q0-8 5.5-15.5T148 333l102-22q1 0 2-.5t3-.5q3 0 5 1l114 20 67-39q5-4 13-4 11 0 18.5 7.5T480 314q0 14-12 22l-76 44q-4 3-8 3.5t-9 .5l-119-22-97 21q-2 1-5 1z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/line-chart";
export { pathData, ltr, accData };