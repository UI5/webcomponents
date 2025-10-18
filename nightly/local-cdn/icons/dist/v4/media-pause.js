import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "media-pause";
const pathData = "M160 64q0-14 9.5-23t22.5-9q14 0 23 9t9 23v385q0 13-9 22.5t-23 9.5q-13 0-22.5-9.5T160 449V64zm128 0q0-14 9.5-23t22.5-9q14 0 23 9t9 23v385q0 13-9 22.5t-23 9.5q-13 0-22.5-9.5T288 449V64z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/media-pause";
export { pathData, ltr, accData };