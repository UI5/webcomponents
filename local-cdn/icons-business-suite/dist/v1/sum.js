import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "sum";
const pathData = "M66.5 54c3-12 16-22 29-22h320c19 0 32 13 32 32s-13 32-32 32h-234l157 134c7 7 13 16 13 26s-3 19-13 26l-157 134h234c19 0 32 13 32 32s-13 32-32 32h-320c-13 0-26-10-29-22-3-13 0-26 10-36l195-166-195-166c-13-10-16-23-10-36z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/sum";
export { pathData, ltr, accData };