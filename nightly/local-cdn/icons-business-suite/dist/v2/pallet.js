import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "pallet";
const pathData = "M0 338c0-2 1-5 2-9l53-176c5-15 15-22 30-22h333c13 0 26 7 30 20l63 177c1 3 1 6 1 11v68c0 17-14 31-31 31h-19c-17 0-32-14-32-31s-14-32-31-32H113c-17 0-31 15-31 32s-14 31-31 31H31c-17 0-31-14-31-31v-69zm230-142v96c0 15 11 26 26 26s26-11 26-26v-96c0-15-11-26-26-26h-2c-15 0-24 11-24 26zm-130 93c-1 16 11 29 26 29 13 0 22-10 25-23l13-94c3-15-10-28-26-28-15 0-23 7-25 21zm272-116c-16 0-28 13-25 28l13 94c3 13 13 23 25 23 16 0 28-13 25-29l-13-95c-2-15-10-22-24-22z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/pallet";
export { pathData, ltr, accData };