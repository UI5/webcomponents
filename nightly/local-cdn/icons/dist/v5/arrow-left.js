import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "arrow-left";
const pathData = "M5.735 3.205a.75.75 0 1 1 1.03 1.09L3.639 7.25H14.25a.75.75 0 0 1 0 1.5H3.634l3.13 2.956a.75.75 0 0 1-1.029 1.09l-4.5-4.248a.757.757 0 0 1 0-1.09l4.5-4.253Z";
const ltr = false;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v5/arrow-left";
export { pathData, ltr, viewBox, accData };