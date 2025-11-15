import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "switch-classes";
const pathData = "M422 0q38 0 64 26t26 64v300q0 11-7.5 18.5T486 416t-18-7.5-7-18.5V90q0-17-11-28t-28-11H122q-11 0-18.5-7T96 26t7.5-18.5T122 0h300zm-96 96q38 0 64 26t26 64v236q0 38-26 64t-64 26H71q-29 0-50-21T0 441V186q0-38 26-64t64-26h236zm39 90q0-17-11-28t-28-11H90q-17 0-28 11t-11 28v255q0 8 6 14t14 6h255q17 0 28-11t11-28V186zM208 288q-20 0-34-14t-14-34 14-34 34-14 34 14 14 34-14 34-34 14zm42 32q29 0 49.5 20t20.5 45q0 14-7.5 22.5T294 416H122q-13 0-19.5-8.5T96 385q0-25 20.5-45t49.5-20h84z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/switch-classes";
export { pathData, ltr, accData };