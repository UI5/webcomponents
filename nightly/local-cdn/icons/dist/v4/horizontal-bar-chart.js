import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "horizontal-bar-chart";
const pathData = "M3 11.25c0-.167.083-.25.25-.25h11.5c.167 0 .25.083.25.25v1.5c0 .167-.083.25-.25.25H3.25c-.167 0-.25-.083-.25-.25v-1.5Zm0-4c0-.167.083-.25.25-.25h7.5c.167 0 .25.083.25.25v1.5c0 .167-.083.25-.25.25h-7.5C3.083 9 3 8.917 3 8.75v-1.5ZM2 1v14H1V1h1Zm1 2.25c0-.167.083-.25.25-.25h5.5c.167 0 .25.083.25.25v1.5c0 .167-.083.25-.25.25h-5.5C3.083 5 3 4.917 3 4.75v-1.5Z";
const ltr = false;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v4/horizontal-bar-chart";
export { pathData, ltr, viewBox, accData };