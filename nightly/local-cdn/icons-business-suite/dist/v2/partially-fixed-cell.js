import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "partially-fixed-cell";
const pathData = "M123 427l258-186H137c-13 0-24 9-24 24v143c0 7 3 14 10 19zm62-307v72h143v-72c0-40-32-71-72-71s-71 31-71 71zm192 0v72c40 0 70 33 70 73v143c0 40-30 72-70 72H137c-40 0-72-32-72-72V265c0-40 32-73 72-73v-72C137 55 191 1 256 1c67 0 121 54 121 119z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/partially-fixed-cell";
export { pathData, ltr, accData };