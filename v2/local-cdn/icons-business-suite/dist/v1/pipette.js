import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "pipette";
const pathData = "M459.562 32h1c32 32 32 31-1 64l-32 32 48 48-80 80-160-160 80-78 48 48 32-34c33-33 31-33 64 0zm-288 384l-96-96 176-176 96 96zm-32-96l32 32 112-112-32-32zm-88 80c0-21 19-40 40-40s40 19 40 40-19 40-40 40-40-19-40-40z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/pipette";
export { pathData, ltr, accData };