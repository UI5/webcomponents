import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "in-progress";
const pathData = "M342 352q-7 0-13-6l-86-68q-6-6-6-13V147q0-19 19-19t19 19v110l80 63q6 4 6 13 0 8-5.5 13.5T342 352zM32 448V64q0-13 9-22.5T64 32h384q13 0 22.5 9.5T480 64v384q0 14-9.5 23t-22.5 9H64q-14 0-23-9t-9-23zm416 0V64H64v384h384z";
const ltr = true;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/in-progress";
export { pathData, ltr, accData };