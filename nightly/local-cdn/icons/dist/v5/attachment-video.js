import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "attachment-video";
const pathData = "M83 201v260h83q11 0 18.5 7t7.5 18-7.5 18.5T166 512H58q-11 0-18.5-7.5T32 486V192q0-10 6-17L181 9q6-9 19-9h190q11 0 18.5 7.5T416 26v108q0 11-7.5 18.5T390 160t-18-7.5-7-18.5V51H212l-21 25v65q0 21-15 36t-36 15H91zm385 145q12 9 12 22t-12 22l-141 86q-5 4-13 4-11 0-18.5-7.5T288 454V282q0-11 7.5-18.5T314 256q8 0 13 4z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/attachment-video";
export { pathData, ltr, accData };