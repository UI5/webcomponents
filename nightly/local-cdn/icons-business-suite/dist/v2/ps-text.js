import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "ps-text";
const pathData = "M51 480c-23 0-38-24-27-47l89-177c7-11 16-16 27-16H44c-15 0-24-11-24-24v-96c0-15 9-23 24-23h72V25c0-15 10-25 23-25h197c6 0 11 2 16 7l141 143c4 4 6 10 6 18v288c0 13-9 24-24 24-13 0-24-11-24-24V177l-7-6h-63c-27 0-48-22-48-49V57l-8-8H163v48h72c15 0 24 8 24 23v96c0 13-9 24-24 24h-95c11 0 19 5 26 16l89 177c11 23-2 47-25 47H51zm17-288h143v-48H68v48zm216 167c0-13 9-24 24-24h95c13 0 24 11 24 24 0 15-11 25-24 25h-95c-15 0-24-10-24-25zm24-46c-15 0-24-10-24-25 0-13 9-24 24-24h95c13 0 24 11 24 24 0 15-11 25-24 25h-95z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/ps-text";
export { pathData, ltr, accData };