import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "horizontal-grip";
const pathData = "M1 7h2v2H1V7Zm12 0h2v2h-2V7ZM9 7h2v2H9V7ZM5 7h2v2H5V7Z";
const ltr = false;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v4/horizontal-grip";
export { pathData, ltr, viewBox, accData };