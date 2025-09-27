import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "add-process";
const pathData = "M0 32Q0 18 9.5 9T32 0q10 0 17 4l306 183q16 10 16 28t-16 27L49 426q-8 5-17 5-13 0-22.5-9T0 399V32zm64 56v254l212-127zm224 328v-32h96v-96h32v96h96v32h-96v96h-32v-96h-96z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/add-process";
export { pathData, ltr, accData };