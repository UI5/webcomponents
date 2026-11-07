import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "screen-split-two";
const pathData = "M13.25 1A2.75 2.75 0 0 1 16 3.75v8.5A2.75 2.75 0 0 1 13.25 15H2.75A2.75 2.75 0 0 1 0 12.25v-8.5A2.75 2.75 0 0 1 2.75 1h10.5Zm-4.5 12.5h4.5c.69 0 1.25-.56 1.25-1.25v-8.5c0-.69-.56-1.25-1.25-1.25h-4.5v11Zm-6-11c-.69 0-1.25.56-1.25 1.25v8.5c0 .69.56 1.25 1.25 1.25h4.5v-11h-4.5Z";
const ltr = false;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v5/screen-split-two";
export { pathData, ltr, viewBox, accData };