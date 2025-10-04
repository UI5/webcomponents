import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "clear-all";
const pathData = "M432 449V288h32v161q0 13-8.5 22.5T433 481H48q-13 0-22.5-9.5T16 449V64q0-13 9-22t23-9h193v32H48v384h384zm64-385l-66 63 66 66-32 32-63-66-65 66-33-32 66-66-66-63 33-32 65 64 63-64z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/clear-all";
export { pathData, ltr, accData };