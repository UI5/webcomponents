import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "heading2";
const pathData = "M230 64q11 0 18.5 7.5T256 90v332q0 11-7.5 18.5T230 448t-18-7.5-7-18.5V290H51v132q0 11-7 18.5T26 448t-18.5-7.5T0 422V90q0-11 7.5-18.5T26 64t18 7.5T51 90v149h154V90q0-11 7-18.5t18-7.5zm148 243q-7 0-7 7v83h115q11 0 18.5 7t7.5 18-7.5 18.5T486 448H346q-11 0-18.5-7.5T320 422V314q0-24 17-41t41-17h76q7 0 7-6v-64q0-7-7-7H346q-11 0-18.5-7t-7.5-18 7.5-18.5T346 128h108q24 0 41 17t17 41v64q0 23-17 40t-41 17h-76z";
const ltr = true;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/heading2";
export { pathData, ltr, accData };