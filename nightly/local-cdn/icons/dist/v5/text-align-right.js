import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "text-align-right";
const pathData = "M58 83q-11 0-18.5-7T32 58t7.5-18.5T58 32h396q11 0 18.5 7.5T480 58t-7.5 18-18.5 7H58zm192 128q-11 0-18.5-7t-7.5-18 7.5-18.5T250 160h204q11 0 18.5 7.5T480 186t-7.5 18-18.5 7H250zM58 352q-11 0-18.5-7.5T32 326t7.5-18 18.5-7h396q11 0 18.5 7t7.5 18-7.5 18.5T454 352H58zm192 128q-11 0-18.5-7.5T224 454t7.5-18 18.5-7h204q11 0 18.5 7t7.5 18-7.5 18.5T454 480H250z";
const ltr = true;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/text-align-right";
export { pathData, ltr, accData };