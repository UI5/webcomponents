import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "face-skeptical";
const pathData = "M16 240C16 108 124 0 256 0s240 108 240 240-108 240-240 240S16 372 16 240zm240 192c107 0 192-85 192-192S363 48 256 48 64 133 64 240s85 192 192 192zm48-252c0-20 16-36 36-36s36 16 36 36-16 36-36 36-36-16-36-36zm-132 36c-20 0-36-16-36-36s16-36 36-36 36 16 36 36-16 36-36 36zm6 90l138-41c15-4 25 1 29 16s-1 26-16 30l-138 41c-15 4-25-1-29-16s1-26 16-30z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/face-skeptical";
export { pathData, ltr, accData };