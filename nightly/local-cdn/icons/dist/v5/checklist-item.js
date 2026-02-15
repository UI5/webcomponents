import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "checklist-item";
const pathData = "M422 32q24 0 41 17t17 41v231q0 34-29 50L269 477q-6 3-13 3t-13-3L61 371q-29-16-29-50V90q0-24 17-41t41-17h332zm7 58q0-7-7-7H90q-7 0-7 7v231q0 4 3 6l170 98 170-98q3-2 3-6V90zm-87 54q11 0 18.5 7.5T368 170q0 8-6 16L247 327q-9 9-20 9t-19-9l-58-66q-6-8-6-17 0-11 7.5-18.5T170 218q12 0 19 9l38 44 96-118q8-9 19-9z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/checklist-item";
export { pathData, ltr, accData };