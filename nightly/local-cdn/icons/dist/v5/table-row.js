import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "table-row";
const pathData = "M12.25 1A2.75 2.75 0 0 1 15 3.75v8.5A2.75 2.75 0 0 1 12.25 15h-8.5A2.75 2.75 0 0 1 1 12.25v-8.5A2.75 2.75 0 0 1 3.75 1h8.5ZM2.5 10v2.25c0 .69.56 1.25 1.25 1.25H5V10H2.5Zm4 0v3.5h3V10h-3Zm4.5 0v3.5h1.25c.69 0 1.25-.56 1.25-1.25V10H11ZM3.75 2.5c-.69 0-1.25.56-1.25 1.25V6H5V2.5H3.75ZM6.5 6h3V2.5h-3V6ZM11 6h2.5V3.75c0-.69-.56-1.25-1.25-1.25H11V6Z";
const ltr = false;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v5/table-row";
export { pathData, ltr, viewBox, accData };