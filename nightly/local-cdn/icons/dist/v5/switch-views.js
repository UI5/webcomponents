import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "switch-views";
const pathData = "M422 64q24 0 41 17t17 41v236q0 24-17 41t-41 17h-6v38q0 24-17 41t-41 17H186q-24 0-41-17t-17-41V352H90q-24 0-41-17t-17-41V58q0-24 17-41T90 0h172q24 0 41 17t17 41v6h102zM128 301v-83q0-24 17-41t41-17h6v-38q0-24 17-41t41-17h19v-6q0-7-7-7H90q-7 0-7 7v236q0 7 7 7h38zm301-179q0-7-7-7H250q-7 0-7 7v38h115q24 0 41 17t17 41v147h6q7 0 7-7V122zm-64 96q0-7-7-7H186q-7 0-7 7v236q0 7 7 7h172q7 0 7-7V218z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/switch-views";
export { pathData, ltr, accData };