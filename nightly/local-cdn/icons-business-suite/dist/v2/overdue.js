import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "overdue";
const pathData = "M69 451c-35-35-26-67 1-67 16 0 24 8 24 25 0 13 11 23 24 23h288c13 0 24-11 24-24V121c0-13-11-24-24-24h-48v24c0 15-9 24-24 24s-24-9-24-24V97h-96v24c0 15-9 24-24 24s-24-9-24-24V97h-48c-13 0-24 10-24 23 0 17-8 25-24 25-27 0-36-32-1-67 20-20 46-29 74-29h23V25c0-15 9-24 24-24s24 9 24 24v24h96V25c0-15 9-24 24-24s24 9 24 24v24h48c40 0 72 32 72 72v287c0 40-32 72-72 72H143c-28 0-54-9-74-29zm118-167c-9-9-9-25 0-34l72-72c6-6 11-8 17-8 5 0 11 2 16 8 11 11 11 23 0 34l-31 31h110c15 0 24 9 24 24s-9 24-24 24H261l31 31c11 11 11 22 0 33-5 5-11 8-16 8-6 0-11-3-17-8zM36 267c0-35 28-63 63-63s63 28 63 63-28 63-63 63-63-28-63-63zm48 0c0 8 7 15 15 15s15-7 15-15-7-15-15-15-15 7-15 15z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/overdue";
export { pathData, ltr, accData };