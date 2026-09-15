import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "screen-split-one";
const pathData = "M1 2c0-.292.094-.531.281-.719A.973.973 0 0 1 2 1h12c.292 0 .531.094.719.281A.973.973 0 0 1 15 2v12c0 .27-.094.505-.281.703A.947.947 0 0 1 14 15H2a.947.947 0 0 1-.719-.297A.988.988 0 0 1 1 14V2Zm13 12V2H6v12h8Zm-9 0V2H2v12h3Z";
const ltr = false;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v4/screen-split-one";
export { pathData, ltr, viewBox, accData };