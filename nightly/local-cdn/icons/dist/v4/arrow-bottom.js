import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "arrow-bottom";
const pathData = "M73 343q-10-10-10-22.5T73 299q9-10 22-10t23 10l105 105V32q0-13 9.5-22.5T255 0q14 0 23 9.5t9 22.5v372l106-106q9-9 22.5-9t22.5 9q10 10 10 23t-10 23L278 503q-9 9-22.5 9t-22.5-9z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/arrow-bottom";
export { pathData, ltr, accData };