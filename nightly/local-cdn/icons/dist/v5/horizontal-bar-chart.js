import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "horizontal-bar-chart";
const pathData = "M487 461q11 0 18 7.5t7 18.5-7 18-18 7H26q-11 0-18.5-7T0 487V25Q0 14 7.5 7T26 0t18 7 7 18v436h436zM122 128q-11 0-18.5-7.5T96 102t7.5-18 18.5-7h300q11 0 18 7t7 18-7 18.5-18 7.5H122zm0 128q-11 0-18.5-7.5T96 230t7.5-18 18.5-7h202q11 0 18 7t7 18-7 18.5-18 7.5H122zm0 128q-11 0-18.5-7.5T96 358t7.5-18 18.5-7h110q11 0 18 7t7 18-7 18.5-18 7.5H122z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/horizontal-bar-chart";
export { pathData, ltr, accData };