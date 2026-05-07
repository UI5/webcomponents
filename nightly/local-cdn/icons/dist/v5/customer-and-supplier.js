import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "customer-and-supplier";
const pathData = "M15.25 1a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75H.75a.75.75 0 0 1-.75-.75v-9.5A.75.75 0 0 1 .75 4H8V1.75A.75.75 0 0 1 8.75 1h6.5ZM1.5 13.5H2a2.5 2.5 0 0 1 5 0h1v-8H1.5v8Zm8 0h5v-2h-5v2ZM4.5 7a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm5 3h1.75V8.5H9.5V10Zm3.25 0h1.75V8.5h-1.75V10ZM9.5 7h1.75V5.5H9.5V7Zm3.25 0h1.75V5.5h-1.75V7ZM9.5 4h1.75V2.5H9.5V4Zm3.25 0h1.75V2.5h-1.75V4Z";
const ltr = false;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v5/customer-and-supplier";
export { pathData, ltr, viewBox, accData };