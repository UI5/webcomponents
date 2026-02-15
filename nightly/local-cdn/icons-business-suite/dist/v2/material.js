import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "material";
const pathData = "M19 148c0-7 5-17 12-20l96-64c4-3 8-4 12-4s9 1 14 4l172 97c7 7 13 14 13 21v11c0 17-8 25-25 25-13 0-25-9-25-22l-147-83-74 47v169l172 107 52-42c4-2 8-3 12-3 9 0 17 4 22 12 7 12 6 26-7 33l-63 50c-4 3-8 4-13 4-4 0-9-1-15-4L31 362c-7-5-12-12-12-19V148zm352 99c0-13 10-25 25-25h73c15 0 24 12 24 25 0 15-9 25-24 25h-12v17c5 1 10 4 15 11 7 11 4 26-7 33l-8 6v5c5 1 10 5 15 11 7 12 4 27-7 34l-8 5v6c5 1 10 4 15 11 7 11 4 26-7 33l-8 6v19c0 15-10 25-25 25-13 0-21-10-24-22-6-2-11-6-16-11-7-11-3-27 8-34l8-5v-6c-7-1-12-4-16-11-7-11-3-26 8-33l8-5v-6c-7-1-12-4-16-10-7-11-3-27 8-34l8-6v-39h-12c-15 0-25-10-25-25zM227 46c-15-7-17-22-10-33 5-8 12-12 21-12 4 0 9 2 14 4l172 98c7 7 11 13 11 20v25c0 15-8 23-24 23-17 0-25-8-25-23v-10zM127 329c-12-7-15-24-8-35 4-7 11-10 19-10 5 0 10 1 15 4l50 31c13 7 14 21 7 34-5 8-12 12-21 12-4 0-9-2-13-4z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/material";
export { pathData, ltr, accData };