import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "sub-content";
const pathData = "M64 448h384q8 0 20-6t12-26V128q-2-14-10-23t-22-9H224l-32-32H64q-17 0-24.5 10.5T32 96v320q0 18 10.5 25t21.5 7zm160-160v128H64V288h160zm0-160v128H64V128h160zM0 448V64q0-8 6-20t26-12h187l29 32h232q11 0 18 5t10 11q4 7 4 16v352q0 17-10.5 24.5T480 480H32q-8 0-20-6T0 448zm288-320h160v128H288V128zm0 288V288h160v128H288z";
const ltr = false;
const accData = null;
const collection = "tnt-v2";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v2/sub-content";
export { pathData, ltr, accData };