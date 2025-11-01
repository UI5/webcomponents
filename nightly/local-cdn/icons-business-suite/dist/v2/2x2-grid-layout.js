import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "2x2-grid-layout";
const pathData = "M89 480c-40 0-72-32-72-72V73C17 33 49 1 89 1h335c40 0 72 32 72 72v335c0 40-32 72-72 72H89zm144-216H65v144c0 13 11 24 24 24h144V264zm215 0H281v168h143c13 0 24-11 24-24V264zM65 216h168V49H89c-13 0-24 11-24 24v143zM281 49v167h167V73c0-13-11-24-24-24H281z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/2x2-grid-layout";
export { pathData, ltr, accData };