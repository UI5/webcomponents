import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "navigation-left-arrow";
const pathData = "M326 416q-10 0-17-7L168 274q-8-6-8-18 0-11 8-19l141-134q7-7 17-7 11 0 18.5 7.5T352 122q0 10-8 18L223 256l121 116q8 8 8 18 0 11-7.5 18.5T326 416z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/navigation-left-arrow";
export { pathData, ltr, accData };