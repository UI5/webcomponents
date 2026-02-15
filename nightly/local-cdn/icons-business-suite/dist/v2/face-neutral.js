import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "face-neutral";
const pathData = "M256 0c132 0 240 108 240 240S388 480 256 480 16 372 16 240 124 0 256 0zm192 240c0-107-85-192-192-192S64 133 64 240s85 192 192 192 192-85 192-192zm-276-24c-20 0-36-16-36-36s16-36 36-36 36 16 36 36-16 36-36 36zm132-36c0-20 16-36 36-36s36 16 36 36-16 36-36 36-36-16-36-36zM184 288h144c15 0 24 9 24 24s-9 24-24 24H184c-15 0-24-9-24-24s9-24 24-24z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/face-neutral";
export { pathData, ltr, accData };