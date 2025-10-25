import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "consumer";
const pathData = "M276.5 284h216v181c0 11-10 20-21 20-10 0-20-9-20-20V325h-68v140c0 11-9 20-20 20-10 0-19-9-19-20V325h-68v140c0 11-10 20-20 20-11 0-20-9-20-20V325h-68v140c0 11-9 20-20 20s-21-9-21-20V325h-67v140c0 11-10 20-21 20s-20-9-20-20V284h217V29c0-11 9-20 20-20 10 0 20 9 20 20v255z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/consumer";
export { pathData, ltr, accData };