import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "cloud";
const pathData = "M379 448H113q-23 0-43.5-9t-36-24.5-24.5-36T0 335q0-21 7.5-40T28 261.5 58.5 237 96 224q0-32 12-61t33-51 49.5-35T251 64q47 0 87 27.5t57 72.5q25 4 46.5 17t37 31.5T503 255t9 50q0 35-16.5 66.5T450 423q-31 25-71 25zM113 274q-26 0-44 18t-18 43q0 26 18 44t44 18h266q17 0 31.5-8.5t26-22.5 18-31 6.5-34-6.5-32.5T437 241t-25.5-19-30.5-8q-26-1-32-28-8-29-35.5-50T250 115q-43 0-73 30.5T147 222v22q0 12-6 21t-20 9h-8z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/cloud";
export { pathData, ltr, accData };