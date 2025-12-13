import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "communication-path";
const pathData = "M28.5 509q-11 0-18-7-7-8-7-18.5t7-17.5l456-456q8-8 18-8 12 0 18 8 8 8 8 18t-8 17l-456 457q-7 7-18 7z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/communication-path";
export { pathData, ltr, accData };