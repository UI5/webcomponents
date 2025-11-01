import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "map-all-fields";
const pathData = "M346 429l-37-97-31 97h68zm87 29q0 14 6 26 4 13 21 13 18 0 22-13 4-7 5-13.5t1-12.5q0-7-1-13.5t-5-13.5q-4-11-21-11-12 0-20 9-8 11-8 29zm-265-19H38q-16 0-27-11T0 400q0-16 11-27t27-11h130q16 0 27 11t11 27q0 17-11 28t-27 11zm249 70V369h17v49q13-13 29-13 23 0 33 16 10 18 10 36 0 20-10.5 37.5T462 512q-19 0-29-16v13h-16zm56-416H38q-16 0-27-11T0 55t11-27.5T38 16h435q17 0 28 11.5T512 55t-11 27-28 11zm0 174H38q-16 0-27-11T0 229t11-27 27-11h435q17 0 28 11t11 27-11 27-28 11zM219 512l77-201h29l82 201h-30l-24-61h-84l-22 61h-28z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/map-all-fields";
export { pathData, ltr, accData };