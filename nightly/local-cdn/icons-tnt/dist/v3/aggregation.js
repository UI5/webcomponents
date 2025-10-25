import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "aggregation";
const pathData = "M198 509H57q-24 0-40.5-16.5T0 452V311q0-24 16.5-40.5T57 254h141q4 0 14 2L418 50h-90q-11 0-18-7t-7-18 7-18 18-7h158q11 0 18.5 7t7.5 18v158q0 11-7.5 18.5T486 209t-18-7.5-7-18.5V78L250 289q4 9 4 22v141q0 24-16.5 40.5T198 509zM57 305q-6 0-6 6v141q0 6 6 6h141q6 0 6-6V311q0-6-6-6H57z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/aggregation";
export { pathData, ltr, accData };