import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "door";
const pathData = "M336 1v32H176V1h160zM65 65h382v447H65V65zm351 414V96H97v383h319zm-65-143c-21 0-31-11-31-32s10-32 31-32c22 0 33 11 33 32s-11 32-33 32z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/door";
export { pathData, ltr, accData };