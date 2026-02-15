import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "business-card";
const pathData = "M422 448H90q-38 0-64-26T0 358V154q0-38 26-64t64-26h332q38 0 64 26t26 64v204q0 38-26 64t-64 26zM90 115q-17 0-28 11t-11 28v204q0 17 11 28t28 11h332q17 0 28-11t11-28V154q0-17-11-28t-28-11H90zm300 96h-76q-11 0-18.5-7t-7.5-18 7.5-18.5T314 160h76q11 0 18.5 7.5T416 186t-7.5 18-18.5 7zm-214 27q-17 0-28-11t-11-28 11-28 28-11 28 11 11 28-11 28-28 11zm214 69h-76q-11 0-18.5-7.5T288 281t7.5-18 18.5-7h76q11 0 18.5 7t7.5 18-7.5 18.5T390 307zm-160 45H122q-11 0-18.5-8.5T96 321q0-13 6-25t16-21 22.5-14 25.5-5h20q29 0 49.5 20t20.5 45q0 14-7.5 22.5T230 352z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/business-card";
export { pathData, ltr, accData };