import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "outbound-delivery-inactive";
const pathData = "M256 0c141 0 256 115 256 256 0 140-115 255-256 255C116 511 1 396 1 256 1 115 116 0 256 0zm0 460c113 0 205-92 205-204 0-113-92-205-205-205-112 0-204 92-204 205 0 112 92 204 204 204z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/outbound-delivery-inactive";
export { pathData, ltr, accData };