import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "eraser";
const pathData = "M155 448h325v32H116q-7 0-11-4l-69-69q-5-5-5-11.5t5-11.5L362 59q4-4 8-4l110-23-22 110q0 3-1 5t-3 4zm3-140l46 45 223-222h1l-46-46z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/eraser";
export { pathData, ltr, accData };