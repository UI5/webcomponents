import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "cross-target";
const pathData = "M134 468l37-37c1 0 1 1 2 1l3 2c1 0 1 1 2 1 24 10 50 15 77 15 111 0 201-89 201-199 0-29-5-55-16-78-1-3-3-4-4-7l38-37 12 24c13 32 20 65 20 98 0 139-115 249-251 249-43 0-85-9-121-32zM6 251C6 113 118 0 255 0c33 0 66 7 98 20l24 12-37 38c-23-15-60-20-85-20-112 0-199 92-199 201 0 27 5 53 15 77 1 3 3 4 4 7l-37 37C15 336 6 294 6 251zm29 220c-9-9-9-24 0-33L443 29c5-5 10-7 17-7s12 2 17 7c9 9 9 24 0 33L68 471c-5 5-10 7-16 7-5 0-11-2-17-7zm218-121l103-103c0 58-43 104-102 104l-1-1h-1 1zm-97-97l-1-1c0-55 45-101 100-101h3L156 253v1-1z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/cross-target";
export { pathData, ltr, accData };