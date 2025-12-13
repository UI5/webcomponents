import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "overview";
const pathData = "M66.5 194c32-73 110-121 189-121h44l-37-37c-8-8-8-21 0-29 9-8 22-8 30 0l72 73c5 5 7 9 7 14 0 7-3 8-7 15l-72 72c-3 4-8 6-15 6s-12-2-15-6c-8-8-8-22 0-30l37-35h-44c-91 0-167 74-167 166 0 91 76 167 167 167 92 0 166-76 166-167 0-27-4-51-16-75-7-9-1-23 8-28 13-7 22-4 29 9 15 29 22 60 22 94 0 115-93 208-209 208-115 0-208-95-208-208 0-30 6-59 19-88zm69 74c31-39 75-59 120-59 47 0 90 20 121 59 8 9 8 18 0 27-31 39-74 59-121 59-45 0-89-20-120-59-8-9-8-18 0-27zm140 42c21-4 39-13 56-28-16-15-35-25-58-29 11 5 17 15 17 29 0 11-5 20-15 28zm-54-28c0-14 6-24 17-29-21 4-42 13-58 29 16 15 36 24 56 28-10-8-15-17-15-28z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/overview";
export { pathData, ltr, accData };