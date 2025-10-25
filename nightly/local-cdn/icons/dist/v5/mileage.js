import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "mileage";
const pathData = "M474 106q6 6 6 16v294q0 26-19 45t-45 19-45-19-19-45v-64h-32v70q0 38-26 64t-64 26H122q-38 0-64-26t-26-64V90q0-38 26-64t64-26h108q38 0 64 26t26 64v211h58q11 0 18 7t7 18v90q0 13 13 13t13-13V202q-3 1-6.5 1H416q-26 0-45-18.5T352 139q0-19 10-34.5T389 81l-31-39q-6-8-6-16 0-11 7.5-18.5T378 0q13 0 20 10zM122 51q-17 0-28 11T83 90v70h186V90q0-17-11-28t-28-11H122zm294 101q13 0 13-13t-13-13-13 13 13 13zm-147 59H83v211q0 17 11 28t28 11h108q17 0 28-11t11-28V211z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/mileage";
export { pathData, ltr, accData };