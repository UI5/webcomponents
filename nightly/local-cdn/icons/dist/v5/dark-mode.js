import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "dark-mode";
const pathData = "M260 480q-47 0-88.5-18T99 413t-49-72.5T32 252q0-39 12-74t33.5-63.5 51-49.5T194 34q5-2 7-2h4q11 0 18 7t7 18q0 7-3 16-5 18-5 39 0 37 14 69.5t38 56.5 56.5 38 69.5 14q21 0 39-5 9-3 16-3 11 0 18 7t7 18v4l-2 7q-10 36-31 65.5t-49.5 51T334 468t-74 12zM172 99q-42 23-65.5 64T83 252q0 36 14 68.5t38 56.5 56.5 38 68.5 14q48 0 89-23.5t64-65.5h-15q-46 0-87.5-17.5t-72-48-48.5-72-18-88.5V99z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/dark-mode";
export { pathData, ltr, accData };