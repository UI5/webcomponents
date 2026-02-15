import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "heart";
const pathData = "M354 32q33 0 61.5 12.5t50 34 34 50T512 190q0 32-12 61t-35 50L290 466q-14 14-34 14t-34-14L46 301q-23-22-34.5-50.5T0 191q0-33 12.5-62t34-50.5 50-34T158 32q57 0 98 38 41-38 98-38z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/heart";
export { pathData, ltr, accData };