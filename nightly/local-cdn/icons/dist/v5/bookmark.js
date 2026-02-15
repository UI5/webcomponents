import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "bookmark";
const pathData = "M422 512q-9 0-14-4L256 402 104 508q-5 4-14 4-11 0-18.5-7.5T64 486V90q0-38 26-64t64-26h204q38 0 64 26t26 64v396q0 11-7.5 18.5T422 512z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/bookmark";
export { pathData, ltr, accData };