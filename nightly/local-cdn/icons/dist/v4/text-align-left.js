import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "text-align-left";
const pathData = "M2 8h11.5c.333 0 .5.167.5.5 0 .333-.167.5-.5.5H2V8Zm0-6h11.5c.333 0 .5.167.5.5 0 .333-.167.5-.5.5H2V2Zm11.5 12c.333 0 .5.167.5.5 0 .333-.167.5-.5.5H2v-1h11.5ZM2 12v-1h5.5c.333 0 .5.167.5.5 0 .333-.167.5-.5.5H2Zm0-7h5.5c.333 0 .5.167.5.5 0 .333-.167.5-.5.5H2V5Z";
const ltr = true;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v4/text-align-left";
export { pathData, ltr, viewBox, accData };