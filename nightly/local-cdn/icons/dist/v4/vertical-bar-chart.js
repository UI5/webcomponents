import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "vertical-bar-chart";
const pathData = "M11 12.75V1.25c0-.167.083-.25.25-.25h1.5c.167 0 .25.083.25.25v11.5c0 .167-.083.25-.25.25h-1.5c-.167 0-.25-.083-.25-.25Zm-4-7.5c0-.167.083-.25.25-.25h1.5c.167 0 .25.083.25.25v7.5c0 .167-.083.25-.25.25h-1.5c-.167 0-.25-.083-.25-.25v-7.5ZM1 14h14v1H1v-1Zm2.25-7h1.5c.167 0 .25.083.25.25v5.5c0 .167-.083.25-.25.25h-1.5c-.167 0-.25-.083-.25-.25v-5.5c0-.167.083-.25.25-.25Z";
const ltr = false;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v4/vertical-bar-chart";
export { pathData, ltr, viewBox, accData };