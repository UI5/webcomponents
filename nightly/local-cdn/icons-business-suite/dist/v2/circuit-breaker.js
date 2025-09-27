import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "circuit-breaker";
const pathData = "M159.5 480c-40 0-72-32-72-72V73c0-40 32-72 72-72h193c40 0 72 32 72 72v335c0 40-32 72-72 72h-193zm-24-407v335c0 13 11 24 24 24h72v-95c0-15 10-24 25-24 13 0 24 9 24 24v95h72c13 0 24-11 24-24V73c0-13-11-24-24-24h-72v88l59 90c7 11 4 27-7 34-5 3-10 4-14 4-9 0-16-4-20-11l-62-96c-3-5-5-9-5-14V49h-72c-13 0-24 11-24 24z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/circuit-breaker";
export { pathData, ltr, accData };