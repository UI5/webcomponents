import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "grip";
const pathData = "M173 285v-64h64v64h-64zm128-176h64v64h-64v-64zm0 223h64v64h-64v-64zm0-336h64v64h-64V-4zM173 444h64v64h-64v-64zm0-448h64v64h-64V-4zm128 225h64v64h-64v-64zm-128-48v-64h64v64h-64zm128 271h64v64h-64v-64zm-64-48h-64v-64h64v64z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/grip";
export { pathData, ltr, accData };