import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "expand-all";
const pathData = "M3.25 2a.75.75 0 0 1 .75.75v8.69l1.22-1.22a.75.75 0 0 1 1.06 1.06l-2.5 2.5a.772.772 0 0 1-1.06 0l-2.5-2.5a.75.75 0 0 1 1.06-1.06l1.22 1.22V2.75A.75.75 0 0 1 3.25 2Zm12 10.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1 0-1.5h5.5Zm0-3.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1 0-1.5h5.5Zm0-3.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 1 1 0-1.5h5.5Zm0-3.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 1 1 0-1.5h5.5Z";
const ltr = false;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v5/expand-all";
export { pathData, ltr, viewBox, accData };