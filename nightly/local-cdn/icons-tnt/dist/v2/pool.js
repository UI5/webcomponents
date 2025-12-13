import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "pool";
const pathData = "M112 0h288q13 0 22.5 9.5T432 32v448q0 14-9.5 23t-22.5 9H112q-14 0-23-9t-9-23V32q0-13 9-22.5T112 0zm160 480h128V64H272v416zm-160 0h128V64H112v416z";
const ltr = false;
const accData = null;
const collection = "tnt-v2";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v2/pool";
export { pathData, ltr, accData };