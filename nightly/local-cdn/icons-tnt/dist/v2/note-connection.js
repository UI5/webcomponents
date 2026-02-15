import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "note-connection";
const pathData = "M475 37q5 5 5 11t-5 11l-45 46q-5 5-11.5 5t-11.5-5-5-11.5 5-11.5l46-45q5-5 11-5t11 5zm-115 92q6-6 11-6 6 0 12 6t6 12q0 5-6 11l-46 45q-5 5-11 5t-11-5-5-11 5-11zm-93 93q6-6 12-6t11 6q6 5 6 11t-6 12l-45 45q-6 5-12 5-5 0-11-5-5-6-5-11 0-6 5-12zm-92 93q5-5 11-5t11 5 5 11-5 11l-45 46q-5 5-11.5 5t-11.5-5-5-11.5 5-11.5zm-93 92q6-6 11-6 6 0 12 6t6 12q0 5-6 11l-46 45q-5 5-11 5t-11-5-5-11 5-11z";
const ltr = false;
const accData = null;
const collection = "tnt-v2";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v2/note-connection";
export { pathData, ltr, accData };