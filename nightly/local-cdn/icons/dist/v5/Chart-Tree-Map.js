import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "Chart-Tree-Map";
const pathData = "M422 32q38 0 64 26t26 64v268q0 38-26 64t-64 26H90q-38 0-64-26T0 390V122q0-38 26-64t64-26h332zm39 90q0-17-11-28t-28-11H211v141h250V122zM51 390q0 17 11 28t28 11h70V83H90q-17 0-28 11t-11 28v268zm160 39h77V275h-77v154zm128-109h122v-45H339v45zm83 109q17 0 28-11t11-28v-19H339v58h83z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/Chart-Tree-Map";
export { pathData, ltr, accData };