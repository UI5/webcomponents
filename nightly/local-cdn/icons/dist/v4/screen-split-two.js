import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "screen-split-two";
const pathData = "M1 2c0-.27.094-.505.281-.703A.947.947 0 0 1 2 1h12c.27 0 .505.099.703.297A.961.961 0 0 1 15 2v12a.947.947 0 0 1-.297.719A.988.988 0 0 1 14 15H2a.973.973 0 0 1-.719-.281A.974.974 0 0 1 1 14V2Zm7.5 0v12H14V2H8.5ZM2 2v12h5.5V2H2Z";
const ltr = false;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v4/screen-split-two";
export { pathData, ltr, viewBox, accData };