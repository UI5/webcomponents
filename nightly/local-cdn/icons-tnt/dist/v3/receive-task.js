import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "receive-task";
const pathData = "M77.5 123q-7 0-13 3h1l176 110q5 4 13 4t13-4l177-110q1 0 2-1-3-1-5.5-1.5t-6.5-.5h-357zm177 169q-21 0-41-13l-161-100v224q0 11 7 19t18 8h357q11 0 19-8t8-19V177l-166 102q-9 5-19.5 9t-21.5 4zm180 188h-357q-32 0-54.5-22.5T.5 403V148q0-32 22.5-54.5T77.5 71h357q32 0 54.5 22.5t22.5 54.5v255q0 32-22.5 54.5T434.5 480z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/receive-task";
export { pathData, ltr, accData };