import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "strikethrough";
const pathData = "M2 2V1h12v1H9v5H7V2H2ZM1 8.5c0-.333.167-.5.5-.5h13c.333 0 .5.167.5.5 0 .333-.167.5-.5.5h-13c-.333 0-.5-.167-.5-.5ZM7 10h2v5H7v-5Z";
const ltr = false;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v4/strikethrough";
export { pathData, ltr, viewBox, accData };