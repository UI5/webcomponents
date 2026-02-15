import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "generation";
const pathData = "M256 480C124 480 17 373 17 241S124 2 256 2c64 0 123 24 170 69 9 11 9 26 0 35-11 9-26 9-35 0-36-36-84-56-135-56-105 0-191 85-191 191 0 105 86 191 191 191 98 0 179-71 190-167H256c-13 0-24-11-24-24s11-24 24-24h215c13 0 24 11 24 24 0 132-107 239-239 239z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/generation";
export { pathData, ltr, accData };