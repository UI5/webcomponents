import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "less";
const pathData = "M14.5 7c.333 0 .5.167.5.5v1c0 .333-.167.5-.5.5h-13a.503.503 0 0 1-.344-.14A.462.462 0 0 1 1 8.5v-1c0-.146.052-.266.156-.36A.503.503 0 0 1 1.5 7h13Z";
const ltr = false;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v4/less";
export { pathData, ltr, viewBox, accData };