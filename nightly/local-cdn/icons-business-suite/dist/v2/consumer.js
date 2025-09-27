import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "consumer";
const pathData = "M17 293c0-13 11-24 24-24h191V27c0-15 9-25 24-25 13 0 24 10 24 25v242h190c15 0 25 11 25 24v163c0 13-10 24-25 24-13 0-24-11-24-24V317h-60v139c0 13-9 24-24 24-13 0-22-11-22-24V317h-60v139c0 13-11 24-24 24-15 0-24-11-24-24V317h-60v139c0 13-11 24-24 24-15 0-23-11-23-24V317H65v139c0 13-11 24-24 24s-24-11-24-24V293z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/consumer";
export { pathData, ltr, accData };