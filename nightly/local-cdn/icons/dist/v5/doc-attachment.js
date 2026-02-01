import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "doc-attachment";
const pathData = "M374 461q11 0 18.5 7t7.5 18-7.5 18.5T374 512H42q-11 0-18.5-7.5T16 486V192q0-10 6-17L165 9q6-9 19-9h190q11 0 18.5 7.5T400 26v76q0 11-7.5 18.5T374 128t-18-7.5-7-18.5V51H196l-20 24v66q0 21-15 36t-36 15H75l-8 9v260h307zM272 186q0-11 7.5-18.5T298 160h172q11 0 18.5 7.5T496 186t-7.5 18-18.5 7H298q-11 0-18.5-7t-7.5-18zm198 70q11 0 18.5 7.5T496 282t-7.5 18-18.5 7H298q-11 0-18.5-7t-7.5-18 7.5-18.5T298 256h172zm-64 96q11 0 18.5 7.5T432 378t-7.5 18-18.5 7H298q-11 0-18.5-7t-7.5-18 7.5-18.5T298 352h108z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/doc-attachment";
export { pathData, ltr, accData };