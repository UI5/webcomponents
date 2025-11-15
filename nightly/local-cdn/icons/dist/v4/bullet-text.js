import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "bullet-text";
const pathData = "M96 0q26 0 45 18.5T160 64q0 26-19 45t-45 19-45-19-19-45q0-27 19-45.5T96 0zm0 192q26 0 45 18.5t19 45.5q0 26-19 45t-45 19-45-19-19-45q0-27 19-45.5T96 192zm0 192q26 0 45 18.5t19 45.5q0 26-19 45t-45 19-45-19-19-45q0-27 19-45.5T96 384zM464 65q16 0 16 16 0 6-4.5 11T464 97H273q-6 0-11-5t-5-11q0-7 5-11.5t11-4.5h191zm0 191q16 0 16 16 0 6-4.5 11t-11.5 5H273q-6 0-11-5t-5-11q0-7 5-11.5t11-4.5h191zm0 192q16 0 16 16 0 6-4.5 11t-11.5 5H273q-6 0-11-5t-5-11q0-7 5-11.5t11-4.5h191z";
const ltr = true;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/bullet-text";
export { pathData, ltr, accData };