import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "minimize";
const pathData = "M15 14c.292 0 .531.099.719.297A.988.988 0 0 1 16 15a.974.974 0 0 1-.281.719A.974.974 0 0 1 15 16H1a.973.973 0 0 1-.719-.281A.974.974 0 0 1 0 15c0-.27.094-.505.281-.703A.947.947 0 0 1 1 14h14Z";
const ltr = false;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v4/minimize";
export { pathData, ltr, viewBox, accData };