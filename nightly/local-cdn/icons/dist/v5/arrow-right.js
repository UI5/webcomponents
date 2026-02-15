import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "arrow-right";
const pathData = "M331 409q-7 7-17 7-11 0-18.5-7.5T288 390q0-10 8-18l95-90H58q-11 0-18.5-7.5T32 256t7.5-18.5T58 230h333l-95-90q-8-8-8-18 0-11 7.5-18.5T314 96q10 0 17 7l141 134q8 8 8 19 0 12-8 18z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/arrow-right";
export { pathData, ltr, accData };