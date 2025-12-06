import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "answered";
const pathData = "M137 254h192c13 0 22-10 22-23V88c0-15-9-24-22-24H89c-13 0-23 9-23 24v229l55-55c5-5 10-8 16-8zM400 88v143c0 40-31 71-71 71H147l-89 88c-8 8-16 9-25 4-10-5-15-12-15-21V88c0-41 31-73 71-73h240c40 0 71 32 71 73zm71 71c15 0 24 9 24 24v286c0 9-5 17-14 22s-19 1-26-6l-89-88H185c-15 0-24-9-24-24s9-23 24-23h191c7 0 13 2 17 7l55 55V183c0-16 8-24 23-24z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/answered";
export { pathData, ltr, accData };