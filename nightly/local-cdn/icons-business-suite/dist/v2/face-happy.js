import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "face-happy";
const pathData = "M256 0c132 0 240 108 240 240S388 480 256 480 16 372 16 240 124 0 256 0zm0 432c107 0 192-85 192-192S363 48 256 48 64 133 64 240s85 192 192 192zm-48-252c0 20-16 36-36 36s-36-16-36-36 16-36 36-36 36 16 36 36zm132-36c20 0 36 16 36 36s-16 36-36 36-36-16-36-36 16-36 36-36zM137 309c1-7 4-12 9-16 11-7 26-6 33 5 17 24 46 38 77 38s60-14 77-38c7-11 23-12 34-5 3 3 4 5 5 7 5 9 4 18-1 26-27 36-67 58-115 58s-88-22-115-58c-4-5-5-10-4-17z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/face-happy";
export { pathData, ltr, accData };