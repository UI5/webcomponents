import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "sum";
const pathData = "M13.25 1a.75.75 0 0 1 0 1.5H4.889l5.83 4.664a.75.75 0 0 1 .022 1.152L4.76 13.5h8.49a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.491-1.316l6.82-5.91L2.28 2.335A.75.75 0 0 1 2.75 1h10.5Z";
const ltr = true;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v5/sum";
export { pathData, ltr, viewBox, accData };