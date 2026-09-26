import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "accessibility";
const pathData = "M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0Zm0 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13Zm2.898 3.588a.75.75 0 0 1 1.014.31c.257.484-.067.907-.494 1.104A8.7 8.7 0 0 1 9 7.188v1.188l1.679 3.555a.75.75 0 0 1-1.357.64L7.996 9.76 6.68 12.57a.75.75 0 0 1-1.358-.637L7 8.356V7.213a7.309 7.309 0 0 1-2.6-.8.75.75 0 1 1 .7-1.326c1.741.919 4.04.904 5.798 0ZM8 2.75a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z";
const ltr = false;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v5/accessibility";
export { pathData, ltr, viewBox, accData };