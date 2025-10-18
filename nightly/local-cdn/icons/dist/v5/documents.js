import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "documents";
const pathData = "M486 0q11 0 18.5 7.5T512 26v460q0 11-7.5 18.5T486 512H154q-11 0-18.5-7.5T128 486V192q0-10 6-17L277 9q8-9 19-9h190zM134 0q11 0 18.5 7.5T160 26q0 9-6 17L51 157v329q0 11-7 18.5T26 512t-18.5-7.5T0 486V147q0-10 7-17L115 8q8-8 19-8zm327 51H308l-20 23v67q0 21-15 36t-36 15h-50l-8 9v260h282V51zM224 282q0-11 7.5-18.5T250 256h140q11 0 18.5 7.5T416 282t-7.5 18-18.5 7H250q-11 0-18.5-7t-7.5-18zm166 70q11 0 18.5 7.5T416 378t-7.5 18-18.5 7H250q-11 0-18.5-7t-7.5-18 7.5-18.5T250 352h140z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/documents";
export { pathData, ltr, accData };