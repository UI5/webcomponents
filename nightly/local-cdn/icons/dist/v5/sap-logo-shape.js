import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "sap-logo-shape";
const pathData = "M16 4H0v8h8l8-8Z";
const ltr = true;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v5/sap-logo-shape";
export { pathData, ltr, viewBox, accData };