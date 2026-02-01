import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "clinical-order";
const pathData = "M64 480V128L192 0h224q14 0 23 9t9 23v448q0 14-8.5 23t-22.5 9H97q-14 0-23.5-9T64 480zm32 0h321l-1-448H224v96q0 14-9 23t-23 9H96v320zm64-160v-64h64v-64h64v64h64v64h-64v64h-64v-64h-64z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/clinical-order";
export { pathData, ltr, accData };