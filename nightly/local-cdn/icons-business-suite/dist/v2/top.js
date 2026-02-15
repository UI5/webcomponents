import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "top";
const pathData = "M3 99c0-19 13-31 36-31h436c23 0 36 12 36 31s-13 33-36 33H39c-23 0-36-14-36-33zm44 326l188-189c7-7 14-10 22-10 9 0 16 3 22 10l190 190c13 13 13 31 0 44-7 7-14 10-22 10-7 0-15-3-23-10L257 303 91 469c-7 7-14 10-22 10-7 0-14-3-22-10-13-13-13-31 0-44z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/top";
export { pathData, ltr, accData };