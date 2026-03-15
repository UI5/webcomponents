import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "minimize";
const pathData = "M480 448q14 0 23 9.5t9 22.5q0 14-9 23t-23 9H32q-14 0-23-9t-9-23q0-13 9-22.5t23-9.5h448z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/minimize";
export { pathData, ltr, accData };