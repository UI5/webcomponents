import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "ad-hoc-marker";
const pathData = "M500 169q5 0 8 3t3 6v5q0 18-4 39.5t-12.5 41T472 298t-35 20q-20 7-43 7h-16.5l-15.5-2q-8-2-16.5-3.5T329 316q-13-5-23.5-8.5t-20-7.5-19.5-9-23-11q-17-8-33.5-15.5T177 248q-26-13-58-13-17 0-28 7t-17.5 18-9.5 25.5-4 28.5q-3 9-11 9H8q-9 0-9-11 0-29 7-55t21.5-46 37-32 54.5-12h16.5l16.5 2 16 4 16 5q7 2 16.5 5.5T220 192q17 10 45 20 19 11 36 18l34 14q16 5 30.5 9t28.5 4q17 0 27.5-7t16.5-18.5 8.5-25.5 3.5-28q0-3 2-6t7-3h41z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/ad-hoc-marker";
export { pathData, ltr, accData };