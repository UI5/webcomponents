import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "3d";
const pathData = "M68 188l145 74c8 4 15 12 15 21v172c0 19-22 31-38 22L44 391c-8-4-12-11-12-21V211c0-19 20-32 36-23zm230 74l146-73c16-8 36 3 36 22l-1 159c0 10-4 17-12 21l-145 86c-16 9-37-3-37-22V283c0-10 4-17 13-21zM267 5l166 79c19 9 20 35 1 46l-167 83c-7 5-15 5-23 0L78 130c-19-11-19-37 0-46L245 5c7-2 15-2 22 0z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/3d";
export { pathData, ltr, accData };