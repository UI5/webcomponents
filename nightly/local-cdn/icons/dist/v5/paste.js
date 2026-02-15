import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "paste";
const pathData = "M102 512H90q-24 0-41-17t-17-41V122q0-24 17-41t41-17h38v-6q0-24 17-41t41-17h76q24 0 41 17t17 41v6h38q24 0 41 17t17 41v12q0 11-7.5 18.5T390 160t-18-7.5-7-18.5v-12q0-7-7-7h-39q-5 20-20.5 32.5T262 160h-76q-21 0-36.5-12.5T129 115H90q-7 0-7 7v332q0 7 7 7h12q11 0 18.5 7t7.5 18-7.5 18.5T102 512zm84-461q-7 0-7 7v44q0 7 7 7h76q7 0 7-7V58q0-7-7-7h-76zm268 461H218q-11 0-18.5-7.5T192 486V218q0-11 7.5-18.5T218 192h236q11 0 18.5 7.5T480 218v268q0 11-7.5 18.5T454 512zm-211-51h186V243H243v218zm115-128h-44q-11 0-18.5-7.5T288 307t7.5-18 18.5-7h44q11 0 18.5 7t7.5 18-7.5 18.5T358 333zm0 83h-44q-11 0-18.5-7.5T288 390t7.5-18 18.5-7h44q11 0 18.5 7t7.5 18-7.5 18.5T358 416z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/paste";
export { pathData, ltr, accData };