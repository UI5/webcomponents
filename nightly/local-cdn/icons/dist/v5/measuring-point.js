import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "measuring-point";
const pathData = "M454 89q11 0 18.5 7.5T480 115q0 3-2 9l-36 88v178q0 24-17 41t-40 17H282q-24 0-41-17t-17-41V90q0-11 7.5-18.5T250 64t18 7.5 7 18.5v70h51q11 0 18.5 7.5T352 186t-7.5 18-18.5 7h-51v13h51q11 0 18.5 7.5T352 250t-7.5 18-18.5 7h-51v26h51q11 0 18.5 7t7.5 18-7.5 18.5T326 352h-51v38q0 7 7 7h103q6 0 6-7V207q0-4 2-10l38-92q6-16 23-16zm-305 66q11 8 11 21t-11 21l-77 54q-7 5-14 5-11 0-18.5-7.5T32 230V122q0-11 7.5-18.5T58 96q7 0 14 5z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/measuring-point";
export { pathData, ltr, accData };