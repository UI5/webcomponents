import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "spill";
const pathData = "M18 368h14c17 0 23 3 38 32s21 32 42 32 27-3 48-32c20-31 27-32 32-32h304v144H18V368zm126-208h-32V0h32l16 32h272c28 0 64 1 64 48s-36 48-64 48H160zm-32 176c-33 0-48-23-48-43 0-10 16-38 48-85 32 47 48 75 48 85 0 20-17 43-48 43z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/spill";
export { pathData, ltr, accData };