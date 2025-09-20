import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "splitter";
const pathData = "M384 448h64v-64h-64v64zm0-224v64h64v-64h-64zm64-160h-64v64h64V64zM32 352V160q0-13 9-22.5t23-9.5h96q14 0 23 9t9 23v80h64V128q0-26 19-45t45-19h32q0-13 9-22.5t23-9.5h64q14 0 23 9t9 23v64q0 14-9.5 23t-22.5 9h-64q-13 0-22.5-9.5T352 128V96h-32q-14 0-23 9.5t-9 22.5v112h64v-16q0-13 9-22.5t23-9.5h64q14 0 23 9t9 23v64q0 14-9.5 23t-22.5 9h-64q-13 0-22.5-9.5T352 288v-16h-64v112q0 13 9 22.5t23 9.5h32v-32q0-13 9-22.5t23-9.5h64q14 0 23 9t9 23v64q0 14-9.5 23t-22.5 9h-64q-13 0-22.5-9.5T352 448h-32q-26 0-45-19t-19-45V272h-64v80q0 14-9.5 23t-22.5 9H64q-13 0-22.5-9.5T32 352z";
const ltr = false;
const accData = null;
const collection = "tnt-v2";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v2/splitter";
export { pathData, ltr, accData };