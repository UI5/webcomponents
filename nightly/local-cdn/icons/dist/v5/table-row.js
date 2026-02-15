import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "table-row";
const pathData = "M390 32q38 0 64 26t26 64v268q0 38-26 64t-64 26H122q-38 0-64-26t-26-64V122q0-38 26-64t64-26h268zm-89 160V83h-90v109h90zm128-70q0-17-11-28t-28-11h-38v109h77v-70zM122 83q-17 0-28 11t-11 28v70h77V83h-38zm89 237v109h90V320h-90zM83 390q0 17 11 28t28 11h38V320H83v70zm307 39q17 0 28-11t11-28v-70h-77v109h38z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/table-row";
export { pathData, ltr, accData };