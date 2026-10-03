import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "warehouse";
const pathData = "M192 216v-74c0-5 3-8 8-8 2 0 3 0 4 1l123 74c3 2 4 4 4 7 0 5-3 8-8 8H200c-5 0-8-3-8-8zm160 0v-74c0-5 3-8 8-8 2 0 3 0 4 1l123 74c3 2 4 4 4 7 0 5-3 8-8 8H360c-5 0-8-3-8-8zM40 134c2 0 3 0 4 1l123 74c3 2 4 4 4 7 0 5-3 8-8 8H40c-5 0-8-3-8-8v-74c0-5 3-8 8-8zM0 480V272c0-11 5-16 16-16h480c8 0 16 7 16 16v208H0zm32-192v160h32v-88c0-23 17-40 40-40h16c23 0 40 17 40 40v88h48v-88c0-23 17-40 40-40h16c23 0 40 17 40 40v88h48v-88c0-23 17-40 40-40h16c23 0 40 17 40 40v88h32V288H32z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/warehouse";
export { pathData, ltr, accData };