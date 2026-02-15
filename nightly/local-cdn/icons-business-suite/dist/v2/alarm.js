import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "alarm";
const pathData = "M19.857 411c-4-11-3-22 5-30 28-28 46-75 46-113v-54c0-135 68-212 187-212 117 0 185 77 185 212v54c0 37 19 86 46 113 8 8 9 19 5 30-5 11-13 16-24 16h-138c-11 31-39 53-74 53s-64-22-75-53h-139c-11 0-19-5-24-16zm104-143c0 44-13 78-28 105h322c-15-27-28-61-28-105v-54c0-105-44-158-132-158-89 0-134 53-134 158v54z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/alarm";
export { pathData, ltr, accData };