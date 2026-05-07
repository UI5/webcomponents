import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "navigation-left-arrow";
const pathData = "M10.795 3.235a.75.75 0 0 0-1.06-.03l-4.5 4.247a.75.75 0 0 0 0 1.09l4.5 4.253a.75.75 0 1 0 1.03-1.09L6.843 7.997l3.922-3.702a.75.75 0 0 0 .03-1.06Z";
const ltr = false;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v5/navigation-left-arrow";
export { pathData, ltr, viewBox, accData };