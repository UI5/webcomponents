import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "adhoc-analysis";
const pathData = "M422.237 384l82 82c16 16 5 45-19 45-7 0-14-3-19-8l-81-81c-41 32-92 52-148 52-131 0-237-106-237-237s106-237 237-237 237 106 237 237c0 56-19 106-52 147zm-369-147c0 101 83 184 184 184s184-83 184-184c0-102-83-185-184-185s-184 83-184 185zm210-119v131c0 15-11 27-26 27s-26-12-26-27V118c0-15 11-27 26-27s26 12 26 27zm-26 185c15 0 26 11 26 26s-11 27-26 27-26-12-26-27 11-26 26-26z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/adhoc-analysis";
export { pathData, ltr, accData };