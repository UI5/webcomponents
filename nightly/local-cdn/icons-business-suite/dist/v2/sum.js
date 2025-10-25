import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "sum";
const pathData = "M147.5 429h287c13 0 26 11 26 26 0 13-13 25-26 25h-355c-11 0-19-5-24-16s-2-20 7-28l227-195-227-195c-9-8-12-17-7-28s13-16 24-16h355c13 0 26 12 26 25 0 15-13 26-26 26h-287l198 169c5 7 8 11 8 19s-3 12-8 19z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/sum";
export { pathData, ltr, accData };