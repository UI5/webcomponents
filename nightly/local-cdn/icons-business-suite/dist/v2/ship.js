import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "ship";
const pathData = "M22.312 318c-7-19-6-38 4-55 9-17 26-32 47-37l41-11V73c0-40 31-72 71-72h144c41 0 71 32 71 72v142h-1l43 12c20 5 36 19 45 36 10 18 12 36 6 55l-36 111c-11 31-41 51-73 51h-255c-32 0-62-20-71-51zm47-32c-3 5-3 10-2 17l36 111c5 12 13 18 26 18h255c13 0 22-6 27-18l36-111c3-6 2-12-1-17-4-7-8-12-16-13l-166-43c-3 0-4-2-7-2s-5 2-8 2l-164 43c-6 1-11 5-16 13zm92-83l76-20c7-2 14-3 20-3 7 0 14 1 20 3l77 20V73c0-13-10-24-25-24h-144c-13 0-24 11-24 24v130zm48-71v-23c0-7 5-12 12-12h72c7 0 12 5 12 12v23c0 8-4 12-12 12h-72c-8 0-12-4-12-12zm-12 205c-7 0-12-5-12-12v-24c0-8 4-12 12-12h24c8 0 12 4 12 12v24c0 7-5 12-12 12h-24zm84-36c0-7 5-12 12-12h24c8 0 12 4 12 12v24c0 7-5 12-12 12h-24c-7 0-12-5-12-12v-24z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/ship";
export { pathData, ltr, accData };