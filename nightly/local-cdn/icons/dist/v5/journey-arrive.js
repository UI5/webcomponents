import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "journey-arrive";
const pathData = "M422 32q38 0 64 26t26 64v268q0 38-26 64t-64 26H154q-38 0-64-26t-26-64v-44q0-11 7.5-18t18.5-7 18 7 7 18v44q0 17 11.5 28t27.5 11h268q17 0 28-11t11-28V122q0-17-11-28t-28-11H154q-16 0-27.5 11T115 122v15q0 11-7 18.5T90 163t-18.5-7.5T64 137v-15q0-38 26-64t64-26h268zM303 275H26q-11 0-18.5-7T0 250t7.5-18.5T26 224h264l-26-27q-8-8-8-18 0-11 7.5-18t18.5-7 18 7l77 77q7 9 7 18t-7 18l-77 77q-7 7-18 7t-18.5-7-7.5-18q0-10 8-18z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/journey-arrive";
export { pathData, ltr, accData };