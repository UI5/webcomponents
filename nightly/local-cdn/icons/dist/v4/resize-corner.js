import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "resize-corner";
const pathData = "M384 160v32q0 12-10 22L182 406q-10 10-22 10h-32zM224 416l160-160v32q0 12-10 22l-96 96q-10 10-22 10h-32zm160-64v32q0 12-10 22t-22 10h-32z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/resize-corner";
export { pathData, ltr, accData };