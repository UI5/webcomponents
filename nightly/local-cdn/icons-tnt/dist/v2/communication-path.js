import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "communication-path";
const pathData = "M453 37q5-5 11-5t11 5 5 11-5 11L59 475q-5 5-11 5t-11-5-5-11 5-11z";
const ltr = false;
const accData = null;
const viewBox = "0 0 512 512";
const collection = "tnt-v2";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "tnt-v2/communication-path";
export { pathData, ltr, viewBox, accData };