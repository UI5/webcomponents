import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "checklist";
const pathData = "M322 45H189c-12 0-22-10-22-23 0-12 10-22 22-22h133c13 0 23 10 23 22 0 13-10 23-23 23zm45 66H145c-12 0-23-10-23-22s11-22 23-22h222c12 0 22 10 22 22s-10 22-22 22zm68 67v197c0 24-14 45-35 57l-133 77c-7 4-15 4-22 0l-134-77c-22-13-33-32-33-57V178c0-24 20-44 44-44h267c24 0 46 20 46 44zM234 316l-42-40c-5-5-11-8-19-8-25 0-37 30-20 47l61 61c5 5 12 8 20 8s15-3 20-8l106-107c11-11 11-28 0-39-5-6-11-9-20-9-7 0-14 3-20 9z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/checklist";
export { pathData, ltr, accData };