import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "outdoor";
const pathData = "M67.5 384h377c28 0 51 22 51 50v22c0 13-11 24-24 24h-431c-13 0-24-11-24-24v-22c0-28 23-50 51-50zm21-240c-40 0-72-31-72-71s32-72 72-72 71 32 71 72-31 71-71 71zm27 157l24-42c11-16 31-16 42 0l16 27 75-130c9-16 32-16 41 0l83 145c9 16-2 34-21 34h-239c-19 0-30-18-21-34z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/outdoor";
export { pathData, ltr, accData };