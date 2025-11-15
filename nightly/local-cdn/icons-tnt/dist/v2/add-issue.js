import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "add-issue";
const pathData = "M221.5 385q8 1 12.5 6t4.5 11-4.5 11-12.5 5h-157q-24 0-44-12.5T.5 365q0-8 2-15.5t4-12.5q3-6 6-11l163-298q8-14 22-21t28-7 26 6 20 20l101 192q3 7-.5 13.5t-9.5 8.5q-5 2-11 .5t-8-5.5l-96-187q-4-8-10-11.5t-12-3.5q-15 0-25 16l-157 290q-9 17-2.5 31.5T66.5 385h155zm290-3v36h-90v94h-38v-94h-90v-36h90v-91h38v91h90zm-268-124q-2 9-9.5 14t-15.5 5q-12 0-18-10-1 0-1-1-1-1-1-2l-3-9-7-106q2-13 11.5-19t20.5-6q13 0 23 8 8 5 8 21zm-23 41q11 0 19 7.5t10 18.5q1 13-7.5 22t-21.5 11q-12 0-21-9.5t-9-20.5q0-12 9-20.5t21-8.5z";
const ltr = false;
const accData = null;
const collection = "tnt-v2";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v2/add-issue";
export { pathData, ltr, accData };