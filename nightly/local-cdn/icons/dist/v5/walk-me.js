import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "walk-me";
const pathData = "M486 160q11 0 18.5 7.5T512 186v108q0 11-7.5 18.5T486 320t-18-7.5-7-18.5v-45L261 447q-15 15-34 24t-41 9h-4q-22 0-42.5-8.5t-35.5-23T79.5 414 69 372q-1-23 7.5-45t25.5-39l114-113q16-16 16-38 0-23-16-38.5T177 83q-22 0-38 16l-43 43v2q0 20-14 34t-34 14-34-14-14-34 14-34 34-14q9 0 18 3l37-36q31-31 74-31 22 0 41 8t33.5 22.5 23 33.5 8.5 41q0 21-8 40.5T252 211L138 324q-18 20-18 43v3q0 25 18.5 42t43.5 17h2q23 0 41-18l201-200h-48q-11 0-18.5-7t-7.5-18 7.5-18.5T378 160h108z";
const ltr = true;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/walk-me";
export { pathData, ltr, accData };