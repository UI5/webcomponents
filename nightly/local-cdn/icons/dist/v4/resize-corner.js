import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "resize-corner";
const pathData = "M13 5v1c0 .25-.104.48-.313.688l-6 6C6.48 12.896 6.25 13 6 13H5l8-8Zm-5 8 5-5v1c0 .25-.104.48-.313.688l-3 3C9.48 12.896 9.25 13 9 13H8Zm5-2v1c0 .25-.104.48-.313.688-.208.208-.437.312-.687.312h-1l2-2Z";
const ltr = false;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v4/resize-corner";
export { pathData, ltr, viewBox, accData };