import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "ui-notifications";
const pathData = "M0 128q0-26 19-45t45-19h448v32H64q-14 0-23 9t-9 23v256q0 14 9 23t23 9h384v32H64q-26 0-45-19T0 384V128zm160 176q0-16 16-16h336v32H176q-16 0-16-16zm-48-112h256q16 0 16 16t-16 16H112q-16 0-16-16t16-16z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/ui-notifications";
export { pathData, ltr, accData };