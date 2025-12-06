import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "visits";
const pathData = "M224 57q0-11 7.5-18t18.5-7h237q11 0 18 7t7 18v365q0 11-7 18.5t-18 7.5H346q-11 0-18.5-7.5T320 422t7.5-18 18.5-7h115V83H275v51q0 11-7 18.5t-18 7.5-18.5-7.5T224 134V57zm32 205q0-11 7.5-18t18.5-7h47l-33-34q-8-8-8-18t7.5-17.5T314 160t18 7l77 77q7 7 7 18 0 12-7 18l-77 77q-8 8-18 8-11 0-18.5-7.5T288 339q0-10 8-18l33-33h-47q-11 0-18.5-7.5T256 262zM26 480q-11 0-18.5-7.5T0 454v-16q0-38 18.5-69T66 321q-26-28-26-66 0-18 6-35t18-30.5T93.5 168t39.5-8q42 0 68.5 26.5T228 253q0 18-6.5 35.5T202 320q30 17 48.5 48.5T269 438v16q0 11-7 18.5t-18 7.5H26zm64-226q0 17 11 30t33 13 32.5-13 10.5-30-10.5-30.5T134 210t-33 13.5T90 254zm128 175q-4-32-27.5-54T135 353q-33 0-56.5 22T52 429h166z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/visits";
export { pathData, ltr, accData };