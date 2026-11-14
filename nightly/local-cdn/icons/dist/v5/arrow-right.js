import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "arrow-right";
const pathData = "M9.205 3.236a.75.75 0 0 1 1.06-.03l4.5 4.252a.757.757 0 0 1 0 1.09l-4.5 4.248a.75.75 0 0 1-1.03-1.09l3.131-2.955H1.75a.75.75 0 0 1 0-1.5h10.611L9.235 4.294a.75.75 0 0 1-.03-1.06Z";
const ltr = false;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v5/arrow-right";
export { pathData, ltr, viewBox, accData };