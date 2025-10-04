import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "navigation-left-arrow";
const pathData = "M375.5 426q9 9 9 22.5t-9 22.5q-10 10-23 10t-23-10l-192-192q-9-9-9-22.5t9-22.5l191-193q10-10 23-10t22 10q10 9 10 22t-10 23l-157 159q-5 5-5 11.5t5 11.5z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/navigation-left-arrow";
export { pathData, ltr, accData };