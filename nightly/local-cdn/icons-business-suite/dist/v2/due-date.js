import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "due-date";
const pathData = "M107 480c-40 0-72-32-72-72V121c0-40 32-72 72-72h48V25c0-15 9-24 24-24s24 9 24 24v24h95V25c0-15 9-24 24-24s24 9 24 24v24h23c28 0 55 9 75 29 35 35 25 67-2 67-16 0-24-8-24-25 0-13-11-23-24-23h-48v24c0 15-9 24-24 24s-24-9-24-24V97h-95v24c0 15-9 24-24 24s-24-9-24-24V97h-48c-13 0-24 11-24 24v287c0 13 11 24 24 24h287c13 0 24-10 24-23 0-17 8-25 24-25 27 0 37 32 2 67-20 20-47 29-75 29H107zm10-213c0-15 9-24 24-24h110l-31-31c-11-11-11-23 0-34 6-6 11-8 17-8s12 2 17 8l72 72c9 9 9 25 0 34l-72 71c-5 5-11 8-17 8s-11-3-17-8c-11-11-11-22 0-33l31-31H141c-15 0-24-9-24-24zm234 0c0-35 28-63 63-63s63 28 63 63-28 63-63 63-63-28-63-63zm63-15c-8 0-15 7-15 15s7 15 15 15 15-7 15-15-7-15-15-15z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/due-date";
export { pathData, ltr, accData };