import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "stripes-pattern";
const pathData = "M466 1L1 466V364L365 1h101zM1 173L174 1h101L1 275V173zm428 338l82-83v51c0 17-14 32-31 32h-51zm82-173L339 511H237l274-274v101zm0-191L148 511H46L511 46v101zM84 1L1 83V33C1 15 16 1 33 1h51z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/stripes-pattern";
export { pathData, ltr, accData };