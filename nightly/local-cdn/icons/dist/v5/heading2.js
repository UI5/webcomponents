import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "heading2";
const pathData = "M7.25 2a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-1.5 0V9h-5v4.25a.75.75 0 0 1-1.5 0V2.75a.75.75 0 0 1 1.5 0V7.5h5V2.75A.75.75 0 0 1 7.25 2Zm7 2c.966 0 1.75.784 1.75 1.75v2a1.75 1.75 0 0 1-1.75 1.75h-2.5a.25.25 0 0 0-.25.25v2.75h3.75a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75v-3.5c0-.966.784-1.75 1.75-1.75h2.5a.25.25 0 0 0 .25-.25v-2a.25.25 0 0 0-.25-.25h-3.5a.75.75 0 0 1 0-1.5h3.5Z";
const ltr = true;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v5/heading2";
export { pathData, ltr, viewBox, accData };