import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "tri-state";
const pathData = "M390 32q38 0 64 26t26 64v268q0 38-26 64t-64 26H122q-38 0-64-26t-26-64V122q0-38 26-64t64-26h268zm39 90q0-17-11-28t-28-11H122q-17 0-28 11t-11 28v268q0 17 11 28t28 11h268q17 0 28-11t11-28V122zm-77 38v192H160V160h192z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/tri-state";
export { pathData, ltr, accData };