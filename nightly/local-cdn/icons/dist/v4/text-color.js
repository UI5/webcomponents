import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "text-color";
const pathData = "M108 352L224 32h64l115 320h-49l-34-96H192l-33 96h-51zm-28 64h352q7 0 11.5 5t4.5 11v32q0 16-16 16H80q-6 0-11-4.5T64 464v-32q0-6 5-11t11-5zm230-192L256 64l-55 160h109z";
const ltr = true;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/text-color";
export { pathData, ltr, accData };