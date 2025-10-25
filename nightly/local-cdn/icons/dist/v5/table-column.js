import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "table-column";
const pathData = "M390 32q38 0 64 26t26 64v268q0 38-26 64t-64 26H122q-38 0-64-26t-26-64V122q0-38 26-64t64-26h268zm39 90q0-17-11-28t-28-11h-70v77h109v-38zM122 83q-17 0-28 11t-11 28v38h109V83h-70zM83 301h109v-90H83v90zm237 0h109v-90H320v90zM83 390q0 17 11 28t28 11h70v-77H83v38zm307 39q17 0 28-11t11-28v-38H320v77h70z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/table-column";
export { pathData, ltr, accData };