import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "gender-male-and-female";
const pathData = "M192 400H96q-16 0-16-16t16-16h96v-50q-24-3-44.5-14T112 276.5 88.5 238 80 192q0-27 10-50t27.5-40.5T158 74t50-10q29 0 53 11.5t42 30.5l74-74h-89q-16 0-16-16t16-16h128q16 0 16 16v128q0 16-16 16t-16-16V55l-79 78q7 14 11 28.5t4 30.5q0 24-8.5 46T304 276.5 268.5 304 224 318v50h96q16 0 16 16t-16 16h-96v96q0 16-16 16t-16-16v-96zm16-112q40 0 68-28t28-68-28-68-68-28-68 28-28 68 28 68 68 28z";
const ltr = true;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/gender-male-and-female";
export { pathData, ltr, accData };