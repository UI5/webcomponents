import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "medicine-syrup";
const pathData = "M64.5 480V224c0-31 11-51 32-72 18-16 39-24 64-24V96h-32c-19 0-32-13-32-32V32c0-19 13-32 32-32h256c19 0 32 13 32 32v32c0 19-13 32-32 32h-32v32c25 0 46 8 64 24 21 21 32 41 32 72v256c0 19-13 32-32 32h-320c-19 0-32-13-32-32zm64-448v32h256V32h-256zm-32 448h320V224c0-35-29-64-64-64h-32V96h-128v64h-32c-35 0-64 29-64 64v256zm64-128v-64h64v-64h64v64h64v64h-64v64h-64v-64h-64z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/medicine-syrup";
export { pathData, ltr, accData };