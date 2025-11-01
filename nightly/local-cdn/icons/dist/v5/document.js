import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "document";
const pathData = "M422 0q11 0 18.5 7.5T448 26v460q0 11-7.5 18.5T422 512H90q-11 0-18.5-7.5T64 486V192q0-10 6-17L213 9q6-9 19-9h190zm-25 51H244l-20 24v66q0 21-15 36t-36 15h-50l-8 9v260h282V51z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/document";
export { pathData, ltr, accData };