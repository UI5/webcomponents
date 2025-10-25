import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "accounting-document-verification";
const pathData = "M422 0q11 0 18.5 7.5T448 26v460q0 11-7.5 18.5T422 512H90q-11 0-18.5-7.5T64 486V192q0-10 6-17L213 9q6-9 19-9h190zm-25 51H244l-20 24v66q0 21-15 36t-36 15h-50l-8 9v260h282V51zM232 320l75-87q8-9 19-9t18.5 7.5T352 250q0 8-6 16l-94 109q-7 9-19 9-11 0-19-8l-47-52q-7-7-7-17 0-11 7.5-18.5T186 281q10 0 19 9z";
const ltr = true;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/accounting-document-verification";
export { pathData, ltr, accData };