import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "sys-minus";
const pathData = "M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0Zm0 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13Zm2.75 5.75a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1 0-1.5h5.5Z";
const ltr = false;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v5/sys-minus";
export { pathData, ltr, viewBox, accData };