import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "thing-type";
const pathData = "M422 96q38 0 64 26t26 64v128q0 37-26 63t-64 26H267l-95 101q-8 8-18 8-11 0-18.5-7.5T128 486V337l-86 73q-6 6-16 6-11 0-18.5-7.5T0 390V90q0-38 26-64T90 0h204q38 0 64 26t26 64v6h38zM128 270v-84q0-38 26-64t64-26h115v-6q0-17-11-28t-28-11H90q-17 0-28 11T51 90v245zm333-84q0-17-11-28t-28-11H218q-17 0-28 11t-11 28v236l58-62q8-8 19-8h166q17 0 28-11t11-27V186z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/thing-type";
export { pathData, ltr, accData };