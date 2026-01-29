import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "weight";
const pathData = "M88.5 1h335c40 0 72 32 72 72v335c0 40-32 72-72 72h-335c-40 0-72-32-72-72V73c0-40 32-72 72-72zm142 102l-9-19c-7-14 14-24 21-11l12 26c19 0 37 5 52 20l34-34c-47-47-122-47-169 0l34 34c7-8 16-12 25-16zm-142 329h335c13 0 24-11 24-24V160h-383v248c0 13 11 24 24 24z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/weight";
export { pathData, ltr, accData };