import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "underline-text";
const pathData = "M14.25 13.5a.75.75 0 0 1 0 1.5H1.75a.75.75 0 0 1 0-1.5h12.5Zm-2-12.5a.75.75 0 0 1 .75.75V7A5 5 0 0 1 3 7V1.75a.75.75 0 0 1 1.5 0V7a3.5 3.5 0 1 0 7 0V1.75a.75.75 0 0 1 .75-.75Z";
const ltr = true;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v5/underline-text";
export { pathData, ltr, viewBox, accData };