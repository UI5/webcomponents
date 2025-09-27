import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "stock-requirements";
const pathData = "M191.972 315c-15 0-24-11-24-24v-83c0-13 9-24 24-24h129c15 0 25 11 25 24v83c0 13-10 24-25 24h-129zm-172-200c-5-9-3-19 4-26l72-72c5-6 10-8 16-8s13 2 18 8l71 72c7 7 11 17 6 26-6 10-13 15-22 15h-48v67c0 15-10 25-23 25-15 0-25-10-25-25v-67h-48c-11 0-18-5-21-15zm292 294c-7-7-12-16-5-25 5-10 12-15 21-15h47v-68c0-13 10-24 25-24 13 0 24 11 24 24v68h47c11 0 19 4 22 15 5 10 4 18-4 25l-72 72c-4 5-10 7-16 7s-12-2-17-7z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/stock-requirements";
export { pathData, ltr, accData };