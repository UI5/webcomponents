import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "port";
const pathData = "M412 245q4 5 4 11.5t-4 10.5l-96 96q-5 5-11 5-7 0-12-5t-5-10q0-1 .5-4.5t4.5-7.5l79-79q3-3 3-6t-3-5l-78-80q-5-5-5-11t5-11 11-5q5 0 12 5zm-193 96q4 4 4.5 7.5t.5 4.5q0 5-5 10t-12 5q-6 0-11-5l-95-96q-5-4-5-10.5t5-11.5l95-96q4-5 11-5t11 5q5 5 5 11t-5 11l-78 80q-3 2-3 5t3 6zM448 32q14 0 23 9t9 23v384q0 14-9 23t-23 9H64q-14 0-23-9t-9-23V64q0-14 9-23t23-9h384zm0 32H64v384h384V64z";
const ltr = false;
const accData = null;
const collection = "tnt-v2";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v2/port";
export { pathData, ltr, accData };