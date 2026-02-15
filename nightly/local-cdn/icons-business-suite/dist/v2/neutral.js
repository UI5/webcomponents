import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "neutral";
const pathData = "M423.5 49h-335c-13 0-24 11-24 24v335c0 13 11 24 24 24h335c13 0 24-11 24-24V73c0-13-11-24-24-24zm0 431h-335c-40 0-72-32-72-72V73c0-40 32-72 72-72h335c40 0 72 32 72 72v335c0 40-32 72-72 72z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/neutral";
export { pathData, ltr, accData };