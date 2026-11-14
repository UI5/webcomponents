import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "play";
const pathData = "M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0Zm0 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.39 5.092a.75.75 0 0 1 .765.027l3.5 2.25a.75.75 0 0 1 0 1.262l-3.5 2.25A.75.75 0 0 1 6 10.25v-4.5a.75.75 0 0 1 .39-.658Z";
const ltr = true;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v5/play";
export { pathData, ltr, viewBox, accData };