import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "display-ads";
const pathData = "M16.5 78c0-43 35-77 76-77h326c43 0 77 34 77 77v231c0 41-34 75-77 75h-139v48h49c13 0 22 11 22 24s-9 24-22 24h-145c-13 0-24-11-24-24s11-24 24-24h48v-48h-139c-41 0-76-34-76-75V78zm48 0v231c0 15 13 27 28 27h326c15 0 29-12 29-27V78c0-15-14-29-29-29h-326c-15 0-28 14-28 29zm239 187V120c0-13 10-22 23-22h48c15 0 24 9 24 22v145c0 13-9 24-24 24h-48c-13 0-23-11-23-24zm-191-72c0-15 11-25 24-25h95c15 0 24 10 24 25 0 13-9 24-24 24h-95c-13 0-24-11-24-24zm0 72c0-15 11-24 24-24h95c15 0 24 9 24 24 0 13-9 24-24 24h-95c-13 0-24-11-24-24zm24-121c-13 0-24-9-24-24 0-13 11-22 24-22h95c15 0 24 9 24 22 0 15-9 24-24 24h-95z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/display-ads";
export { pathData, ltr, accData };