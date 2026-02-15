import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "add-point";
const pathData = "M165.5 310c-83 0-154-71-154-154 0-84 71-155 154-155 84 0 155 71 155 155 0 83-71 154-155 154zm155 104c-15 0-26-13-26-26 0-15 11-26 26-26h51v-52c0-15 13-25 26-25 15 0 25 10 25 25v52h52c13 0 26 11 26 26 0 13-13 26-26 26h-52v50c0 15-10 26-25 26-13 0-26-11-26-26v-50h-51z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/add-point";
export { pathData, ltr, accData };