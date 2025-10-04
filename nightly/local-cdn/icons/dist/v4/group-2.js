import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_GROUP_2 } from "../generated/i18n/i18n-defaults.js";

const name = "group-2";
const pathData = "M415 64h64q14 0 23 9t9 23v320q0 13-9 22.5t-23 9.5h-64v-32h64V96h-64V64zM-1 416V96q0-14 9.5-23T31 64h64v32H31v320h64v32H31q-13 0-22.5-9.5T-1 416zm144-96h224q16 0 16 16 0 6-4.5 11t-11.5 5H143q-6 0-11-5t-5-11q0-7 5-11.5t11-4.5zm0-96h224q16 0 16 16 0 6-4.5 11t-11.5 5H143q-6 0-11-5t-5-11q0-7 5-11.5t11-4.5zm-16-80q0-7 5-11.5t11-4.5h224q16 0 16 16 0 6-4.5 11t-11.5 5H143q-6 0-11-5t-5-11z";
const ltr = false;
const accData = ICON_GROUP_2;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, accData, collection, packageName });

export default "SAP-icons-v4/group-2";
export { pathData, ltr, accData };