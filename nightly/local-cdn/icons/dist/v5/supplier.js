import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "supplier";
const pathData = "M342 223q48 23 77 67.5t29 99.5v32q0 11-7.5 18.5T422 448h-38v6q0 24-17 41t-41 17H186q-24 0-41-17t-17-41v-6H90q-11 0-18.5-7.5T64 422v-32q0-55 29-99.5t77-67.5q-42-40-42-95 0-27 10-50t27.5-40.5 41-27.5T256 0t49.5 10 41 27.5 27.5 41 10 49.5q0 27-11 52t-31 43zM256 51q-32 0-54.5 22.5T179 128t22.5 54.5T256 205t54.5-22.5T333 128t-22.5-54.5T256 51zm141 339q0-28-10.5-52.5t-29-42.5-43-28.5T262 256h-12q-28 0-52.5 10.5t-43 28.5-29 42.5T115 390v7h13v-19q0-24 17-41t41-17h140q24 0 41 17t17 41v19h13v-7zm-64-12q0-7-7-7H186q-7 0-7 7v76q0 7 7 7h140q7 0 7-7v-76z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/supplier";
export { pathData, ltr, accData };