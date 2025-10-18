import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "heart";
const pathData = "M366 31q30 0 57 12t46.5 32.5 31 47.5 11.5 58q0 61-42 105L275 484q-8 8-18 8-11 0-19-8L43 286q-20-21-31.5-48.5T0 181q0-31 11.5-58T43 75.5 90 43t57-12q39 0 66 17.5T256 88q17-22 44-39.5T366 31z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/heart";
export { pathData, ltr, accData };