import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "edit-outside";
const pathData = "M512 112q0 9-7 18L130 504q-7 7-18 7H26q-11 0-18.5-7T0 486v-87q0-10 8-18L382 7q7-7 18-7t18 7l87 87q7 9 7 18zm-62 0l-50-50-50 50 50 50zm-86 86l-50-50L62 399l50 51zm141 193q7 9 7 18 0 11-7 18l-78 78q-7 7-18 7t-18-7.5-7-18.5 7-18l34-33h-79q-11 0-18.5-7.5T320 409t7.5-18 18.5-7h79l-34-34q-7-7-7-18t7-18 18-7 18 7z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/edit-outside";
export { pathData, ltr, accData };