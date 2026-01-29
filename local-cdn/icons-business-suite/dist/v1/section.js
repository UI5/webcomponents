import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "section";
const pathData = "M212.5 247l25-2c-28-8-49-34-49-65 0-39 29-68 68-68 37 0 68 29 68 68 0 31-21 57-49 65l24 2c28 0 50 22 50 49v85h-187v-85c0-27 23-49 50-49zm176-13l23-2c-23-8-37-29-37-53 0-31 25-56 56-56s55 25 55 56c0 24-14 45-37 53l25 2c21 0 38 16 38 37v97h-137v-73c0-17-6-32-17-47 7-8 17-13 31-14zM3.5 368v-97c0-21 17-37 38-37l25-2c-23-8-37-29-37-53 0-31 24-56 55-56s56 25 56 56c0 24-14 45-37 53l23 2c13 1 24 6 31 15-11 13-17 29-17 46v73H3.5z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/section";
export { pathData, ltr, accData };