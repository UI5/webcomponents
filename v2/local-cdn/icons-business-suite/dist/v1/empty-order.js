import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "empty-order";
const pathData = "M6 281v-62c0-20 11-31 31-31h62c18 0 32 13 32 31v15h250v-15c0-20 11-31 31-31h62c18 0 32 13 32 31v62c0 17-15 32-32 32h-62c-20 0-31-13-31-32v-15H131v15c0 17-15 32-32 32H37c-20 0-31-13-31-32zm406-62v62h62v-62h-62zm-375 0v62h62v-62H37z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/empty-order";
export { pathData, ltr, accData };