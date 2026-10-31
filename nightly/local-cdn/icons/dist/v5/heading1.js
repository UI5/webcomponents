import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "heading1";
const pathData = "M7.25 2a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-1.5 0V9h-5v4.25a.75.75 0 0 1-1.5 0V2.75a.75.75 0 0 1 1.5 0V7.5h5V2.75A.75.75 0 0 1 7.25 2Zm7.628 2.099A.758.758 0 0 1 16 4.75v8.5a.75.75 0 0 1-1.5 0V6.042l-2.378 1.36a.75.75 0 0 1-.744-1.303l3.5-2Z";
const ltr = true;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v5/heading1";
export { pathData, ltr, viewBox, accData };