import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "washing-machine";
const pathData = "M391 480H122q-38 0-64-26t-26-64V121q0-37 26-63t64-26h269q37 0 63 26t26 63v269q0 38-26 64t-63 26zM122 83q-17 0-28 11t-11 27v269q0 17 11 28t28 11h269q16 0 27-11t11-28V121q0-16-11-27t-27-11H122zm262 77q0 14-9 23t-23 9-23-9-9-23 9-23 23-9 23 9 9 23zM256 384q-40 0-68-28t-28-68 28-68 68-28 68 28 28 68-28 68-68 28zm0-141q-19 0-32 13t-13 32 13 32 32 13 32-13 13-32-13-32-32-13z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/washing-machine";
export { pathData, ltr, accData };