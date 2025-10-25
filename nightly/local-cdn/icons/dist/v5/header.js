import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "header";
const pathData = "M390 32q38 0 64 26t26 64v268q0 38-26 64t-64 26H122q-38 0-64-26t-26-64V122q0-38 26-64t64-26h268zM122 83q-17 0-28 11t-11 28v38h346v-38q0-17-11-28t-28-11H122zm268 346q17 0 28-11t11-28V211H83v179q0 17 11 28t28 11h268z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/header";
export { pathData, ltr, accData };