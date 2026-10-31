import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "vertical-grip";
const pathData = "M7 15v-2h2v2H7ZM7 3V1h2v2H7Zm0 4V5h2v2H7Zm0 4V9h2v2H7Z";
const ltr = false;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v4/vertical-grip";
export { pathData, ltr, viewBox, accData };