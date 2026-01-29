import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "minimize";
const pathData = "M390 480H122q-38 0-64-26t-26-64V122q0-38 26-64t64-26h268q38 0 64 26t26 64v268q0 38-26 64t-64 26zM122 83q-17 0-28 11t-11 28v268q0 17 11 28t28 11h268q17 0 28-11t11-28V122q0-17-11-28t-28-11H122zm204 269H186q-11 0-18.5-7.5T160 326t7.5-18 18.5-7h140q11 0 18.5 7t7.5 18-7.5 18.5T326 352z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/minimize";
export { pathData, ltr, accData };