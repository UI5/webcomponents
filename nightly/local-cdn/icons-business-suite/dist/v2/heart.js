import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "heart";
const pathData = "M459.5 286l-5 6v2l-181 178c-4 5-10 8-18 8-7 0-13-3-18-8l-180-180c-1-1-1-2-1-2-22-19-56-68-56-118 0-85 68-153 153-153 39 0 74 13 104 40 27-27 64-40 101-40 85 0 153 68 153 153 0 62-30 87-52 114zm-407-114c0 35 28 71 39 82h1v2l165 162 167-169c20-20 35-37 35-77 0-56-45-101-101-101-32 0-62 14-82 41l-4 4c-1 1-2 1-3 1-1 1-3 0-7 3v1h-11c-2 0-4-1-6-3-1 0-2 0-3-1h-1c-3-1-3-4-6-5-19-27-50-41-82-41-56 0-101 45-101 101z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/heart";
export { pathData, ltr, accData };