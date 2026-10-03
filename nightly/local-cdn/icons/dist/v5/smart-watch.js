import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "smart-watch";
const pathData = "M9.754 0c.691 0 1.251.56 1.251 1.25V3h.25a1.75 1.75 0 0 1 1.751 1.75v.254c.614 0 .994.332.994.85v1.3a.85.85 0 0 1-.85.849h-.144v3.247a1.75 1.75 0 0 1-1.75 1.75h-.251v1.75c0 .69-.56 1.25-1.25 1.25H6.251c-.69 0-1.25-.56-1.25-1.25V13h-.25A1.75 1.75 0 0 1 3 11.25v-6.5C3 3.784 3.784 3 4.751 3h.25V1.25c0-.69.56-1.25 1.251-1.25h3.502ZM4.751 4.5a.25.25 0 0 0-.25.25v6.5c0 .138.112.25.25.25h6.504a.25.25 0 0 0 .25-.25v-6.5a.25.25 0 0 0-.25-.25H4.751Z";
const ltr = true;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v5/smart-watch";
export { pathData, ltr, viewBox, accData };