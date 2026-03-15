import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "screen-split-three";
const pathData = "M422 32q38 0 64 26t26 64v268q0 38-26 64t-64 26H90q-38 0-64-26T0 390V122q0-38 26-64t64-26h332zM202 83v346h108V83H202zM51 390q0 17 11 28t28 11h60V83H90q-17 0-28 11t-11 28v268zm410-268q0-17-11-28t-28-11h-60v346h60q17 0 28-11t11-28V122z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/screen-split-three";
export { pathData, ltr, accData };