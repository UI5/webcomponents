import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "tray";
const pathData = "M47 421V309c0-7 3-35 8-40 1-2 4-4 7-5l32-120c3-16 16-28 32-28h257c16 0 30 12 33 28l32 119c14 5 17 34 17 46v112c0 15-11 28-27 28H73c-16 0-26-12-26-28zm93-253l-27 93h18c9 0 19 6 22 14 4 9 12 14 25 14h157c11 0 19-5 22-14 3-8 12-14 23-14h17l-28-93c0-3-2-5-6-5H146c-3 0-5 2-6 5zM94 337v40c0 21 1 23 24 23h276c19 0 23-2 23-23v-40H94z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/tray";
export { pathData, ltr, accData };