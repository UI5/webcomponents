import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "documents";
const pathData = "M13.986 4.008H8v1.996a.97.97 0 0 1-.28.717 1.08 1.08 0 0 1-.749.281H5.007v7.984h8.98V4.008ZM2.014 12.99h-.998V1.014c0-.291.104-.53.312-.717a.933.933 0 0 1 .686-.281h8.98v.998h-8.98V12.99Zm11.973-9.98c.27 0 .509.094.717.28.187.188.28.427.28.718v10.978a.97.97 0 0 1-.28.717.971.971 0 0 1-.718.281H5.008a.971.971 0 0 1-.717-.28.972.972 0 0 1-.28-.718V6.004l2.99-2.994h6.984Zm-1.996 7.984H7.002v-.998h4.989v.998Zm0 1.996H7.002v-.998h4.989v.998Z";
const ltr = false;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v4/documents";
export { pathData, ltr, viewBox, accData };