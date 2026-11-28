import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "district-heating";
const pathData = "M105.946 464c-2-6 0-11 2-15 61-98 34-143 3-195-35-55-74-119-4-242 7-10 19-14 28-8 11 5 14 18 8 28-58 102-29 151 3 200 34 57 71 119-3 239-4 5-10 9-17 9-4 0-8-1-11-3-5-4-8-8-9-13zm319-460c9 5 13 18 8 28-60 102-30 151 1 200 35 57 73 119-3 239-2 5-9 9-17 9-3 0-7-1-11-3s-7-8-8-13c-1-6-1-11 3-15 60-98 33-143 1-195-34-55-73-119-3-242 6-10 19-14 29-8zm-166 473c-9-6-12-19-5-28 60-98 33-143 1-195-34-55-73-119-3-242 3-6 8-8 14-10 4-1 11-1 15 2 9 5 13 18 8 28-60 102-30 151 1 200 35 56 73 119-1 239-4 5-11 9-18 9-4 0-8-1-12-3z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/district-heating";
export { pathData, ltr, accData };