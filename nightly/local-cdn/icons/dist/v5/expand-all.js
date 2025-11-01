import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "expand-all";
const pathData = "M314 115q-11 0-18.5-7T288 90t7.5-18.5T314 64h172q11 0 18.5 7.5T512 90t-7.5 18-18.5 7H314zM161 327q7-7 18-7t18.5 7.5T205 346q0 10-8 18l-77 76q-6 8-18 8-10 0-18-8L7 364q-7-7-7-18t7.5-18.5T26 320t18 7l33 34V90q0-11 7-18.5t18-7.5 18.5 7.5T128 90v271zm325-154q11 0 18.5 7t7.5 18-7.5 18.5T486 224H314q-11 0-18.5-7.5T288 198t7.5-18 18.5-7h172zm0 115q11 0 18.5 7.5T512 314t-7.5 18-18.5 7H314q-11 0-18.5-7t-7.5-18 7.5-18.5T314 288h172zm0 109q11 0 18.5 7t7.5 18-7.5 18.5T486 448H314q-11 0-18.5-7.5T288 422t7.5-18 18.5-7h172z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/expand-all";
export { pathData, ltr, accData };