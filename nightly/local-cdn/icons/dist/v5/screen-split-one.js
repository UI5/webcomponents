import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "screen-split-one";
const pathData = "M13.25 1A2.75 2.75 0 0 1 16 3.75v8.5A2.75 2.75 0 0 1 13.25 15H2.75A2.75 2.75 0 0 1 0 12.25v-8.5A2.75 2.75 0 0 1 2.75 1h10.5ZM5.5 13.5h7.75c.69 0 1.25-.56 1.25-1.25v-8.5c0-.69-.56-1.25-1.25-1.25H5.5v11Zm-2.75-11c-.69 0-1.25.56-1.25 1.25v8.5c0 .69.56 1.25 1.25 1.25H4v-11H2.75Z";
const ltr = false;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v5/screen-split-one";
export { pathData, ltr, viewBox, accData };