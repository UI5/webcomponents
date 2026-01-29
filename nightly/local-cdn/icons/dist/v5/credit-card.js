import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "credit-card";
const pathData = "M454 64q24 0 41 17t17 41v268q0 24-17 41t-41 17H58q-24 0-41-17T0 390V122q0-24 17-41t41-17h396zM58 115q-7 0-7 7v38h410v-38q0-7-7-7H58zm396 282q7 0 7-7V224H51v166q0 7 7 7h396zM262 288q11 0 18.5 7.5T288 314t-7.5 18-18.5 7H122q-11 0-18.5-7T96 314t7.5-18.5T122 288h140z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/credit-card";
export { pathData, ltr, accData };