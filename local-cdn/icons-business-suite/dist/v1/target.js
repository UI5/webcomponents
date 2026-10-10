import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "target";
const pathData = "M365 218L256 365 146 218h73V37h74v181h72zm146 292H1V308h70v107c0 20 15 35 35 35h299c20 0 36-15 36-35V308h70v202z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/target";
export { pathData, ltr, accData };