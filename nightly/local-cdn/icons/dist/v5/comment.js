import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "comment";
const pathData = "M26 512q-11 0-18.5-7.5T0 486V77q0-32 22.5-54.5T77 0h358q32 0 54.5 22.5T512 77v248q0 32-22.5 54.5T435 402H139L44 504q-8 8-18 8zM77 51q-11 0-18.5 7.5T51 77v344l58-62q8-8 19-8h307q11 0 18.5-7.5T461 325V77q0-11-7.5-18.5T435 51H77zm281 128H154q-11 0-18.5-7t-7.5-18 7.5-18.5T154 128h204q11 0 18.5 7.5T384 154t-7.5 18-18.5 7zm-76 96H154q-11 0-18.5-7t-7.5-18 7.5-18.5T154 224h128q11 0 18 7.5t7 18.5-7 18-18 7z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/comment";
export { pathData, ltr, accData };