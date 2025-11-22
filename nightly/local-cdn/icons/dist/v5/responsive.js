import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "responsive";
const pathData = "M262 397q11 0 18.5 7t7.5 18-7.5 18.5T262 448H154q-11 0-18.5-7.5T128 422t7.5-18 18.5-7h38v-45H58q-24 0-41-17T0 294V90q0-24 17-41t41-17h332q24 0 41 17t17 41v44q0 11-7.5 18.5T422 160t-18-7.5-7-18.5V90q0-7-7-7H58q-7 0-7 7v204q0 7 7 7h204q11 0 18.5 7t7.5 18-7.5 18.5T262 352h-19v45h19zm224-173q11 0 18.5 7.5T512 250v204q0 11-7.5 18.5T486 480H378q-11 0-18.5-7.5T352 454V250q0-11 7.5-18.5T378 224h108zm-83 51v109h58V275h-58z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/responsive";
export { pathData, ltr, accData };