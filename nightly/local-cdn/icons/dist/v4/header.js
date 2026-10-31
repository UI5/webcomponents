import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "header";
const pathData = "M15 14a.974.974 0 0 1-.281.719A.974.974 0 0 1 14 15H2a.988.988 0 0 1-.703-.281A.947.947 0 0 1 1 14V2c0-.27.099-.505.297-.703A.961.961 0 0 1 2 1h12c.292 0 .531.099.719.297A.988.988 0 0 1 15 2v12Zm-1-9H2v9h12V5Z";
const ltr = false;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v4/header";
export { pathData, ltr, viewBox, accData };