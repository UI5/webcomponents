import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "grip";
const pathData = "M365 60h-64V-4h64v64zm-192 0V-4h64v64h-64zm0 113v-64h64v64h-64zm192 0h-64v-64h64v64zm-64 48h64v64h-64v-64zm-64 64h-64v-64h64v64zm64 47h64v64h-64v-64zm-128 0h64v64h-64v-64zm192 176h-64v-64h64v64zm-128 0h-64v-64h64v64z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/grip";
export { pathData, ltr, accData };