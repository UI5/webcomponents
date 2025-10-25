import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "paging";
const pathData = "M480 448q14 0 23 9t9 23q0 13-9 22.5t-23 9.5H32q-13 0-22.5-9.5T0 480q0-14 9.5-23t22.5-9h448zm0-224q14 0 23 9t9 23q0 13-9 22.5t-23 9.5H32q-13 0-22.5-9.5T0 256q0-14 9.5-23t22.5-9h448zM32 64q-13 0-22.5-9.5T0 32Q0 18 9.5 9T32 0h448q14 0 23 9t9 23q0 13-9 22.5T480 64H32z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/paging";
export { pathData, ltr, accData };