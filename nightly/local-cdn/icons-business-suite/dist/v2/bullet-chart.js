import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "bullet-chart";
const pathData = "M2 232c0-15 10-26 25-26h314v-28c0-15 10-26 25-26s25 11 25 26v28h96c15 0 26 11 26 26v45c0 15-11 26-26 26h-96v29c0 15-10 25-25 25s-25-10-25-25v-29H27c-15 0-25-11-25-26v-45z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/bullet-chart";
export { pathData, ltr, accData };