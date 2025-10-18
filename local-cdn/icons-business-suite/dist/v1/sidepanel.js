import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "sidepanel";
const pathData = "M512 512H0V0h512v512zM352 32H32v448h320V32zm32 448h96V32h-96v448z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/sidepanel";
export { pathData, ltr, accData };