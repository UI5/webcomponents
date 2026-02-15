import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "attachment-photo";
const pathData = "M422 0q11 0 18.5 7.5T448 26v460q0 11-7.5 18.5T422 512H90q-11 0-18.5-7.5T64 486V192q0-10 6-17L213 9q6-9 19-9h190zM224 75v66q0 21-15 36t-36 15h-50l-8 9v155l43-31q7-5 15-5 13 0 21 11l64 93 60-42q7-4 15-4 11 0 18 7l46 48V51H244zm72 245q-16 0-28-12t-12-28 12-28 28-12 28 12 12 28-12 28-28 12z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/attachment-photo";
export { pathData, ltr, accData };