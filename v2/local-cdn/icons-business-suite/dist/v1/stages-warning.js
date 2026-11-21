import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "stages-warning";
const pathData = "M87 162L249 0l162 162-162 162zM249 36L122 162l127 127 126-127zm262 475H383V383h128v128zM192 383h128v128H192V383zM1 511V383h127v128H1zm223-96v64h64v-64h-64zM33 479h63v-64H33v64zm206-307l-9-70c0-13 6-19 19-19 5 0 9 1 14 4 4 3 6 8 6 15l-10 70c-1 4-2 7-3 9-1 1-4 1-7 1-7 0-9-3-10-10zm10 68c-12 0-19-9-19-21 0-7 2-11 6-13 3-3 8-5 13-5s10 2 14 5c4 2 6 6 6 13s-2 13-6 16c-5 3-10 5-14 5z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/stages-warning";
export { pathData, ltr, accData };