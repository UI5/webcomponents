import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "mirrored-task";
const pathData = "M256 0c142 0 256 115 256 256 0 142-114 256-256 256-109 0-201-68-238-164h206V100c0-2-1-3-4-3l-77 78-47-47c-7-7-8-37-8-38 0-12 2-27 10-35 44-35 98-55 158-55zM85 273l-44-44c-27-27-41-58-41-93s14-66 41-92L87 0l7 6C73 33 62 62 62 91c0 28 9 51 26 68l59 56 41-41c3 0 4 1 4 3v139H50c-3 0-4-1-4-3 0-1 0-2 1-3z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/mirrored-task";
export { pathData, ltr, accData };