import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "open-folder";
const pathData = "M459 34l1 77c0 3 0 6-1 8-1 3-3 2-4 5-7 7-8 6-13 7h-2l-77 1c-11 0-20-9-20-20s9-20 20-20l27-1-15-15c-47-47-124-45-171 2-18 18-47-11-29-29 31-31 71-48 114-48 43-1 83 15 114 46l16 15V35c0-11 9-21 20-21s20 9 20 20zm-41 180v28c24 8 41 30 41 57 0 3 0 5-1 6l-41 121c-11 32-23 51-59 54H113c-35 0-61-26-61-61 0-1 1-3 1-4V175c0-35 26-61 61-61h40c3 0 7 1 11 2l78 38 114-1c35 0 61 26 61 61zm-267-60h-37c-11 0-21 10-21 21v119l1-2c11-36 31-54 60-54h224v-24c0-11-10-20-21-20H239c-2 0-5-1-9-2zm228 259l39-117c-1-11-9-18-20-18H154c-4 0-14 0-22 27L93 422c1 11 9 17 20 17h244c11-1 14-1 22-26z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/open-folder";
export { pathData, ltr, accData };