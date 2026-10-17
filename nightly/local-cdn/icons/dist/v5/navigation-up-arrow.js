import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "navigation-up-arrow";
const pathData = "M3.235 10.795a.75.75 0 0 1-.03-1.06l4.247-4.5a.75.75 0 0 1 1.09 0l4.253 4.5a.75.75 0 1 1-1.09 1.03L7.997 6.843l-3.702 3.922a.75.75 0 0 1-1.06.03Z";
const ltr = false;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v5/navigation-up-arrow";
export { pathData, ltr, viewBox, accData };