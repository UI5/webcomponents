import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "collapse-all";
const pathData = "M314 115q-11 0-18.5-7T288 90t7.5-18.5T314 64h173q11 0 18 7.5t7 18.5-7 18-18 7H314zm-186 36v271q0 11-7 18.5t-18 7.5-18.5-7.5T77 422V151l-33 33q-8 8-18 8-11 0-18.5-7.5T0 166q0-10 8-18l76-77q9-7 19-7 9 0 18 7l76 77q8 8 8 18 0 11-7.5 18.5T179 192q-10 0-18-8z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/collapse-all";
export { pathData, ltr, accData };