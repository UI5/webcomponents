import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "status-error";
const pathData = "M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0Zm3.707 4.293a1 1 0 0 0-1.414 0L8 6.586 5.707 4.293a1 1 0 1 0-1.414 1.414L6.586 8l-2.293 2.293a1 1 0 1 0 1.414 1.414L8 9.414l2.293 2.293a1 1 0 1 0 1.414-1.414L9.414 8l2.293-2.293a1 1 0 0 0 0-1.414Z";
const ltr = false;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v5/status-error";
export { pathData, ltr, viewBox, accData };