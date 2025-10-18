import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "lightbulb";
const pathData = "M160 380q0-9-2-18t-7-19-14.5-23-23.5-30q-17-22-33-48.5T64 176q0-38 16.5-70t44-55.5 62-37T257 0t70 13.5T388 51t43.5 56 16.5 70q0 39-16.5 65.5T398 291q-27 33-36.5 51t-9.5 36q0 19-7 28.5t-18 9.5H186q-15 0-20.5-10t-5.5-26zm97-329q-25 0-50.5 9.5t-46 26.5-33 39.5T115 176q0 26 11 44t28 38q17 21 33 46t21 61h96q5-36 21-61t33-46q17-20 28-37.5t11-43.5q0-27-12.5-50T352 87t-45-26.5-50-9.5zm69 461H186q-11 0-18.5-7.5T160 486t7.5-18 18.5-7h140q11 0 18.5 7t7.5 18-7.5 18.5T326 512z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/lightbulb";
export { pathData, ltr, accData };