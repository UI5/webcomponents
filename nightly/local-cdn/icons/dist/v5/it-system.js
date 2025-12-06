import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "it-system";
const pathData = "M422 0q38 0 64 26t26 64v236q0 38-26 64t-64 26H320v6q0 38-26 64t-64 26H90q-38 0-64-26T0 422V186q0-38 26-64t64-26h102v-6q0-38 26-64t64-26h140zm39 90q0-17-11-28t-28-11H282q-17 0-28 11t-11 28v7q33 5 55 29.5t22 59.5v179h102q17 0 28-11t11-28V90zm-51-7q25 0 25 26 0 25-25 25-26 0-26-25 0-26 26-26zM269 186q0-17-11-28t-28-11H90q-17 0-28 11t-11 28v236q0 17 11 28t28 11h140q17 0 28-11t11-28V186zm-64-7q25 0 25 26 0 25-25 25-26 0-26-25 0-26 26-26zm201 90q11 0 18.5 7t7.5 18-7.5 18.5T406 320h-44q-11 0-18.5-7.5T336 294t7.5-18 18.5-7h44zm-208 96q11 0 18.5 7t7.5 18-7.5 18.5T198 416h-76q-11 0-18.5-7.5T96 390t7.5-18 18.5-7h76z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/it-system";
export { pathData, ltr, accData };