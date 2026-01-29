import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "sap-logo-shape";
const pathData = "M486 192q11 0 18.5 7.5T512 218t-9 19L273 441q-7 7-17 7H26q-11 0-18.5-7.5T0 422V218q0-11 7.5-18.5T26 192h460z";
const ltr = true;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/sap-logo-shape";
export { pathData, ltr, accData };