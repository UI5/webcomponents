import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "direction-arrows";
const pathData = "M3.737 4.2A.751.751 0 0 1 5 4.75v6.5a.75.75 0 0 1-1.262.55L.236 8.55a.758.758 0 0 1 0-1.1L3.737 4.2Zm7.715-.137a.751.751 0 0 1 .81.137l3.502 3.25a.758.758 0 0 1 0 1.1l-3.502 3.25a.751.751 0 0 1-1.26-.55v-6.5a.75.75 0 0 1 .45-.687Z";
const ltr = false;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v5/direction-arrows";
export { pathData, ltr, viewBox, accData };