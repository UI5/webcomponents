import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "menu";
const pathData = "M48 64q20 0 34 14t14 34-14 34-34 14-34-14-14-34 14-34 34-14zm438 64H186q-11 0-18.5-7.5T160 102t7.5-18 18.5-7h300q11 0 18.5 7t7.5 18-7.5 18.5T486 128zM48 208q20 0 34 14t14 34-14 34-34 14-34-14-14-34 14-34 34-14zm438 80H186q-11 0-18.5-7.5T160 262t7.5-18 18.5-7h300q11 0 18.5 7t7.5 18-7.5 18.5T486 288zM48 352q20 0 34 14t14 34-14 34-34 14-34-14-14-34 14-34 34-14zm438 83H186q-11 0-18.5-7t-7.5-18 7.5-18.5T186 384h300q11 0 18.5 7.5T512 410t-7.5 18-18.5 7z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/menu";
export { pathData, ltr, accData };