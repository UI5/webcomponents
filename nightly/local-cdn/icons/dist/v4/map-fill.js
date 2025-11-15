import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "map-fill";
const pathData = "M256 0q98 0 145 62 47 63 47 116 0 46-36 113-41 75-156 221Q121 326 90 271q-26-47-26-94 0-65 48.5-121T256 0zm-96 192q0 44 26 70t70 26q43 0 69.5-26t26.5-70-26.5-70T256 96q-44 0-70 26t-26 70z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/map-fill";
export { pathData, ltr, accData };