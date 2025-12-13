import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "arrow-top";
const pathData = "M409 181q7 7 7 17 0 11-7.5 18.5T390 224q-10 0-18-8l-90-95v333q0 11-7.5 18.5T256 480t-18.5-7.5T230 454V121l-90 95q-8 8-18 8-11 0-18.5-7.5T96 198q0-10 7-17L238 40q6-8 18-8 11 0 19 8z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/arrow-top";
export { pathData, ltr, accData };