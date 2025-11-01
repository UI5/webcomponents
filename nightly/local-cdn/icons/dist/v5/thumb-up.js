import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "thumb-up";
const pathData = "M58 512q-24 0-41-17T0 454V250q0-24 17-41t41-17h90l67-175q5-17 30-17 15 0 28.5 6.5t24 17.5T314 49.5t6 31.5v79h103q37 0 63 26t26 63q0 5-.5 10.5T510 270l-41 173q-8 31-32 50t-55 19H58zm89-269v218h235q14 0 24-8t13-22l41-173q1-3 1-9 0-15-11.5-26.5T423 211H295q-11 0-18.5-7t-7.5-18V81q0-16-14-25l-65 171q-6 16-24 16h-19zM51 454q0 7 7 7h38V243H58q-7 0-7 7v204z";
const ltr = true;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/thumb-up";
export { pathData, ltr, accData };