import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "face-awful";
const pathData = "M256.5 1c132 0 239 107 239 239s-107 240-239 240-240-108-240-240 108-239 240-239zm0 431c105 0 191-87 191-192s-86-191-191-191-192 86-192 191 87 192 192 192zm84-216c-20 0-36-16-36-36s16-36 36-36 35 16 35 36-15 36-35 36zm-132-36c0 20-16 36-36 36s-36-16-36-36 16-35 36-35 36 15 36 35zm46 96l22-23c22-22 56 12 34 34l-22 23 22 22c15 15 4 41-17 41-7 0-12-2-17-7l-22-23-22 23c-5 5-10 7-17 7-21 0-32-26-17-41l22-22-22-23c-22-22 12-56 34-34z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/face-awful";
export { pathData, ltr, accData };