import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "navigation-right-arrow";
const pathData = "M5.205 3.235a.75.75 0 0 1 1.06-.03l4.5 4.247a.75.75 0 0 1 0 1.09l-4.5 4.253a.75.75 0 1 1-1.03-1.09l3.922-3.708-3.922-3.702a.75.75 0 0 1-.03-1.06Z";
const ltr = false;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v5/navigation-right-arrow";
export { pathData, ltr, viewBox, accData };