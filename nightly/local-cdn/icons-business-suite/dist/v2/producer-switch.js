import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "producer-switch";
const pathData = "M36.5 240c0-81 66-147 147-147 30 0 112 24 112 59 0 14-12 23-25 23-5 0-11-2-16-7-19-20-42-30-71-30-56 0-101 46-101 102s45 101 101 101c47 0 88-31 99-78h-99c-13 0-22-11-22-23 0-13 9-23 22-23h125c12 0 23 10 23 23 0 81-67 148-148 148s-147-67-147-148zm335-67V23c0-12 8-22 23-22 12 0 22 10 22 22v138l50 39c5 4 8 9 9 16 0 5-1 12-5 16-4 7-10 10-17 10-6 0-11-2-15-6l-59-45c-5-4-8-10-8-18zm0 117c0-12 8-23 23-23 12 0 22 11 22 23v167c0 12-10 23-22 23-15 0-23-11-23-23V290z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/producer-switch";
export { pathData, ltr, accData };