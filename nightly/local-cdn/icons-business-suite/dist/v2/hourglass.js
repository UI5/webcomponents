import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "hourglass";
const pathData = "M380 503H132c-15 0-25-10-25-25 0-127 59-191 102-223-43-32-102-97-102-223 0-15 10-25 25-25h248c15 0 25 10 25 25 0 126-59 191-102 223 43 32 102 96 102 223 0 15-10 25-25 25zM353 56H157c11 112 74 157 97 172 24-16 91-59 99-172zM174 379h164c-25-60-65-86-82-97-17 11-57 40-82 97z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/hourglass";
export { pathData, ltr, accData };