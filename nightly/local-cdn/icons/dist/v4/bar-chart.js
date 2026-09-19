import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "bar-chart";
const pathData = "M13.25 1h1.5c.167 0 .25.083.25.25v13.5c0 .167-.083.25-.25.25h-1.5c-.167 0-.25-.083-.25-.25V1.25c0-.167.083-.25.25-.25Zm-8 4h1.5c.167 0 .25.083.25.25v9.5c0 .167-.083.25-.25.25h-1.5c-.167 0-.25-.083-.25-.25v-9.5c0-.167.083-.25.25-.25ZM9 7.25c0-.167.083-.25.25-.25h1.5c.167 0 .25.083.25.25v7.5c0 .167-.083.25-.25.25h-1.5c-.167 0-.25-.083-.25-.25v-7.5Zm-8 7.5v-3.5c0-.167.083-.25.25-.25h1.5c.167 0 .25.083.25.25v3.5c0 .167-.083.25-.25.25h-1.5c-.167 0-.25-.083-.25-.25Z";
const ltr = false;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v4/bar-chart";
export { pathData, ltr, viewBox, accData };