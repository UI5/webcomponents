import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "source";
const pathData = "M1 308h70v107c0 20 15 35 35 35h299c20 0 36-15 36-35V308h70v202H1V308zm145-124L255 37l110 147h-73v181h-74V184h-72z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/source";
export { pathData, ltr, accData };