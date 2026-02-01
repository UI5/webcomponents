import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "pie-chart";
const pathData = "M498 177q14 43 14 89 0 98-63 173l-16-14-152-153zm-231 57V1q68 4 125 41.5t88 96.5zm138 219q-61 51-138 58-12 1-21.5 1t-20.5-1q-62-5-113.5-39T31 385q-11-19-17-38-14-39-14-81 0-90 58-160 15-16 29-28 60-50 138-58v254z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/pie-chart";
export { pathData, ltr, accData };