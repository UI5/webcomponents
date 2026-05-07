import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "bar-chart";
const pathData = "M2.25 11a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-.75.75h-.5a.75.75 0 0 1-.75-.75v-2.5a.75.75 0 0 1 .75-.75h.5Zm4-6a.75.75 0 0 1 .75.75v8.5a.75.75 0 0 1-.75.75h-.5a.75.75 0 0 1-.75-.75v-8.5A.75.75 0 0 1 5.75 5h.5Zm8-4a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-.5a.75.75 0 0 1-.75-.75V1.75a.75.75 0 0 1 .75-.75h.5Zm-4 6a.75.75 0 0 1 .75.75v6.451a.75.75 0 0 1-.75.75h-.5a.75.75 0 0 1-.75-.75V7.75A.75.75 0 0 1 9.75 7h.5Z";
const ltr = false;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v5/bar-chart";
export { pathData, ltr, viewBox, accData };