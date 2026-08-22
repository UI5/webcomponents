import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "shelf";
const pathData = "M2 16V1c0-.292.094-.531.281-.719A.973.973 0 0 1 3 0h10c.27 0 .505.094.703.281A.947.947 0 0 1 14 1v15h-1v-3H3v3H2Zm1-4h10V9H3v3Zm0-8h10V1H3v3Zm0 1v3h10V5H3Zm3.5 1h3c.333 0 .5.167.5.5 0 .333-.167.5-.5.5h-3c-.333 0-.5-.167-.5-.5 0-.333.167-.5.5-.5Zm0 4h3c.333 0 .5.167.5.5 0 .333-.167.5-.5.5h-3c-.333 0-.5-.167-.5-.5 0-.333.167-.5.5-.5Zm0-8h3c.333 0 .5.167.5.5 0 .333-.167.5-.5.5h-3c-.333 0-.5-.167-.5-.5 0-.333.167-.5.5-.5Z";
const ltr = false;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v4/shelf";
export { pathData, ltr, viewBox, accData };