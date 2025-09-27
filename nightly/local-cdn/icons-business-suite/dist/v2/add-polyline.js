import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "add-polyline";
const pathData = "M17.5 183c-12-7-16-23-9-35 5-8 13-12 22-12 4 0 9 1 13 4l110 65 85-89c5-5 11-7 19-7 7 0 13 2 18 7l88 89 109-65c4-3 8-4 13-4 8 0 16 4 21 12 7 12 3 28-9 35l-125 75c-4 3-9 4-13 4-7 0-13-3-18-8l-83-83-82 84c-5 5-11 7-18 7-5 0-10-1-14-3zm316 231c-15 0-25-10-25-25s10-26 25-26h50v-50c0-15 11-25 26-25s25 10 25 25v50h50c15 0 26 11 26 26s-11 25-26 25h-50v50c0 15-10 26-25 26s-26-11-26-26v-50h-50z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/add-polyline";
export { pathData, ltr, accData };