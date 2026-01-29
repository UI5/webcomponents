import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "storage";
const pathData = "M17 312c0-15 11-24 24-24h430c13 0 24 9 24 24 0 13-11 24-24 24H280v120c0 13-11 24-24 24s-24-11-24-24V336H41c-13 0-24-11-24-24zm0-142c0-13 11-24 24-24h191V26c0-13 11-24 24-24s24 11 24 24v120h191c13 0 24 11 24 24 0 15-11 24-24 24H41c-13 0-24-9-24-24z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/storage";
export { pathData, ltr, accData };