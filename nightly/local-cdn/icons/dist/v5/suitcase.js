import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "suitcase";
const pathData = "M422 128q38 0 64 26t26 64v172q0 38-26 64t-64 26H90q-38 0-64-26T0 390V218q0-38 26-64t64-26h38V90q0-24 17-41t41-17h140q24 0 41 17t17 41v38h38zm-243 0h154V90q0-7-7-7H186q-7 0-7 7v38zm-19 51v250h192V179H160zM51 390q0 17 11 28t28 11h19V179H90q-17 0-28 11t-11 28v172zm410-172q0-17-11-28t-28-11h-19v250h19q17 0 28-11t11-28V218z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/suitcase";
export { pathData, ltr, accData };