import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "driver";
const pathData = "M208 240c-66 0-120-54-120-120C88 55 142 0 208 0c67 0 121 55 121 120 0 66-54 120-121 120zm0-192c-39 0-71 32-71 72 0 39 32 72 71 72s72-33 72-72c0-40-33-72-72-72zm168 192c65 0 120 53 120 119 0 67-55 121-120 121-66 0-120-54-120-121 0-66 54-119 120-119zm-168 72c-72 0-128 53-141 120h140c13 0 25 9 25 24 0 13-12 24-25 24H40c-13 0-24-11-24-24 0-107 85-192 192-192 13 0 24 11 24 24 0 15-11 24-24 24zm168 120c40 0 72-33 72-73s-32-71-72-71c-41 0-72 31-72 71s31 73 72 73zm0-114c24 0 43 17 43 41s-19 43-43 43c-25 0-42-19-42-43s17-41 42-41z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/driver";
export { pathData, ltr, accData };