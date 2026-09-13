import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "event";
const pathData = "M1 0h510v251H1V0zm0 480v-59c0-20 32-36 72-39-24-3-43-22-43-49s23-49 50-49c28 0 50 22 50 49s-19 46-42 49c40 3 71 19 71 39v59H1zm424-98c-23-3-42-22-42-49s22-49 50-49c27 0 50 22 50 49s-19 46-43 49c40 3 71 19 71 39v59H354v-59c0-20 31-36 71-39zm-90 98H178v-59c0-20 31-36 71-39-23-3-42-22-42-49s22-49 50-49c27 0 50 22 50 49s-19 46-43 49c40 3 71 19 71 39v59z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/event";
export { pathData, ltr, accData };