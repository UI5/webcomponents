import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "bookmark";
const pathData = "M11.25 0A2.75 2.75 0 0 1 14 2.75v12.5c0 .618-.741.972-1.222.583l-4.62-3.741a.25.25 0 0 0-.315 0l-4.621 3.741c-.48.389-1.222.035-1.222-.583V2.75A2.75 2.75 0 0 1 4.75 0h6.5Z";
const ltr = false;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v5/bookmark";
export { pathData, ltr, viewBox, accData };