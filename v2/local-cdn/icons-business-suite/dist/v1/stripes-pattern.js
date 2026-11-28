import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "stripes-pattern";
const pathData = "M46 511L511 45v102L148 511H46zM1 364L365 1h101L1 466V364zm237 147l273-274v101L339 511H238zM1 274V173L174 1h101zm479 237h-51l82-83v51c0 17-14 32-31 32zM1 83V33C1 15 16 1 33 1h51z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/stripes-pattern";
export { pathData, ltr, accData };