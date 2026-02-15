import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "workflow-editor";
const pathData = "M461 154H359v102h102V154zM110 359q18 0 31 13t13 30v66q0 19-13 31.5T110 512H44q-18 0-31-12.5T0 468v-66q0-17 13-30t31-13h66zm88 51q11 0 18 7t7 18-7 18.5-18 7.5-18.5-7.5T172 435t7.5-18 18.5-7zm61-22q11 2 17.5 10t4.5 19q-2 12-10 17t-19 5q-11-2-17-10t-4-19q1-11 9-17.5t19-4.5zm228-286q11 0 18 7.5t7 18.5v154q0 11-7 18t-18 7H333q-11 0-18.5-7t-7.5-18v-51h-51q-1 0-4.5-.5T247 229l-2-1q-2 0-6-4.5t-5-6.5l-2-2q-1-3-1-10V102h-82q-8 23-27.5 37.5T77 154q-32 0-54.5-22.5T0 77t22.5-54.5T77 0q25 0 44.5 14.5T149 51h82q21 0 36 15t15 36v77h25v-51q0-11 7.5-18.5T333 102h154zM256 318q11 0 18.5 7.5T282 344t-7.5 18.5T256 370t-18-7.5-7-18.5 7-18.5 18-7.5zm0-69q11 0 18.5 7t7.5 18-7.5 18.5T256 300t-18-7.5-7-18.5 7-18 18-7z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/workflow-editor";
export { pathData, ltr, accData };