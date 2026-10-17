import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "female";
const pathData = "M8 0a4.5 4.5 0 0 1 .75 8.937V11h2.5a.75.75 0 0 1 0 1.5h-2.5v2.75a.75.75 0 0 1-1.5 0V12.5h-2.5a.75.75 0 0 1 0-1.5h2.5V8.937A4.5 4.5 0 0 1 8 0Zm0 1.5a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z";
const ltr = false;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v5/female";
export { pathData, ltr, viewBox, accData };