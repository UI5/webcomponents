import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "traffic-cone";
const pathData = "M40 480c-13 0-24-11-24-24 0-15 11-23 24-23h29l24-65h325l26 63v2h29c13 0 23 8 23 23 0 13-10 24-23 24H40zm78-172l39-104h194l43 104H118zm208-165H180l49-125c4-12 13-18 22-18s19 6 24 17z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/traffic-cone";
export { pathData, ltr, accData };