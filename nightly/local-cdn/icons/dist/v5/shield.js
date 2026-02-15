import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "shield";
const pathData = "M430 52q18 7 18 25v179q0 41-14.5 79.5t-39 71.5-56 58.5T274 506q-8 4-11.5 5t-6.5 1q-8 0-23-8t-30.5-19-28.5-21.5-19-15.5q-45-42-68-90.5T64 256V77q0-18 18-25L248 1q3-1 8-1t8 1zm-33 44L282 60v177l115-13V96zm-282 0v128l115 13V60zm1 179q6 54 38.5 96t75.5 71V288zm166 167q43-29 75.5-71t38.5-96l-114 13v154z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/shield";
export { pathData, ltr, accData };