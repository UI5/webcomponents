import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "blank-tag";
const pathData = "M486 448H140q-14 0-23-12L6 270q-4-5-4-14t4-14L117 76q9-12 23-12h346q11 0 19.5 8t8.5 20v328q0 12-8.5 20t-19.5 8zm-333-51h309V115H153L58 256zm25-93q-20 0-34-14t-14-34 14-34 34-14q19 0 33.5 14t14.5 34-14.5 34-33.5 14z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/blank-tag";
export { pathData, ltr, accData };