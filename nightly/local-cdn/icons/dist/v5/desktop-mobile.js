import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "desktop-mobile";
const pathData = "M14.75 7.5c.69 0 1.25.56 1.25 1.25v6c0 .69-.56 1.25-1.25 1.25h-3c-.69 0-1.25-.56-1.25-1.25v-6c0-.69.56-1.25 1.25-1.25h3Zm-.5-7.5C15.216 0 16 .784 16 1.75v3.5a.75.75 0 0 1-1.5 0v-3.5a.25.25 0 0 0-.25-.25H1.75a.25.25 0 0 0-.25.25v8.5c0 .138.112.25.25.25h6.5a.75.75 0 0 1 0 1.5H8v1.5h.25a.75.75 0 0 1 0 1.5h-4.1a.75.75 0 0 1 0-1.5H6V12H1.75A1.75 1.75 0 0 1 0 10.25v-8.5C0 .784.784 0 1.75 0h12.5ZM12 14.5h2.5V9H12v5.5Z";
const ltr = false;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v5/desktop-mobile";
export { pathData, ltr, viewBox, accData };