import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "outbox";
const pathData = "M186 128q-11 0-18.5-7.5T160 102q0-10 7-17l70-77q8-8 19-8t19 8l70 77q7 7 7 17 0 11-7.5 18.5T326 128q-10 0-18-8l-26-29v139q0 11-7.5 18.5T256 256t-18.5-7.5T230 230V91l-25 29q-10 8-19 8zm236-64q24 0 41 17t17 41v332q0 24-17 41t-41 17H90q-24 0-41-17t-17-41V122q0-24 17-41t41-17h12q11 0 18.5 7.5T128 90t-7.5 18-18.5 7H90q-7 0-7 7v147h93q11 0 18 7t7 18v15q0 24 16 40t39 16 39-16 16-40v-15q0-11 7-18t18-7h93V122q0-7-7-7h-12q-11 0-18.5-7T384 90t7.5-18.5T410 64h12zm0 397q7 0 7-7V320h-67q-5 42-34.5 69T256 416t-71.5-27-33.5-69H83v134q0 7 7 7h332z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/outbox";
export { pathData, ltr, accData };