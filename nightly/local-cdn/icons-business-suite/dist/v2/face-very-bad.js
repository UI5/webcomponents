import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "face-very-bad";
const pathData = "M256 0c132 0 240 108 240 240S388 480 256 480 16 372 16 240 124 0 256 0zm0 432c106 0 192-86 192-192 0-105-86-192-192-192-105 0-192 87-192 192 0 106 87 192 192 192zm-48-252c0 20-16 36-36 36s-36-16-36-36 16-36 36-36 36 16 36 36zm132-36c20 0 36 16 36 36s-16 36-36 36-36-16-36-36 16-36 36-36zm-84 120c48 0 89 22 115 58 5 7 8 17 3 24s-12 14-22 14H160c-9 0-17-5-21-14-5-7-3-17 2-24 26-36 67-58 115-58z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/face-very-bad";
export { pathData, ltr, accData };