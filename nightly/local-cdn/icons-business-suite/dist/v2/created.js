import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "created";
const pathData = "M64.5 168c0-6 2-11 7-16l144-144c5-5 10-7 16-7h191c14 0 25 10 25 24v431c0 12-8 24-23 24h-336c-15 0-24-12-24-24V168zm58 0l-10 10v254h288V49h-159l-10 10v61c0 27-20 48-47 48h-62zm48 119c-11-9-11-24 0-33 5-5 11-7 17-7s12 2 16 7l31 32 79-80c5-6 11-8 17-8s13 2 18 8c9 9 9 24 0 35l-97 95c-4 4-10 7-16 7s-12-3-17-7z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/created";
export { pathData, ltr, accData };