import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "partially-delivered";
const pathData = "M400 425V50H112v7zM88 2h336c15 0 24 11 24 24v430c0 13-9 24-24 24H88c-13 0-24-11-24-24V26C64 13 75 2 88 2z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/partially-delivered";
export { pathData, ltr, accData };