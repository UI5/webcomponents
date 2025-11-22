import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "add-product";
const pathData = "M227 48q-13-8-13-22 0-11 7.5-18.5T240 0q7 0 13 3l198 116q13 8 13 22v89q0 11-7.5 18.5T438 256t-18-7.5-7-18.5v-74zm28 400q8-3 13-3 11 0 18.5 7t7.5 18q0 15-13 23l-27 16q-7 3-13 3-7 0-13-3L29 393q-13-7-13-22V163q0-8 2-14t9-11l103-69q7-5 14-5 8 0 13 4l167 104q12 6 12 22v37q0 12-8 18.5t-19 6.5q-9 0-17-6.5t-8-19.5v-23l-139-87-78 53v184l174 100zm-38-131q13 8 13 22 0 11-7.5 18.5T204 365q-8 0-13-4l-66-38q-13-8-13-22 0-11 7.5-18.5T138 275q7 0 12 4zm253 57q11 0 18.5 7.5T496 400t-7.5 18.5T470 426h-60v60q0 11-7.5 18.5T384 512t-18.5-7.5T358 486v-60h-60q-11 0-18.5-7.5T272 400t7.5-18.5T298 374h60v-60q0-11 7.5-18.5T384 288t18.5 7.5T410 314v60h60z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/add-product";
export { pathData, ltr, accData };