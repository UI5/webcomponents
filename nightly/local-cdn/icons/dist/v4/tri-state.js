import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "tri-state";
const pathData = "M448 32q13 0 22.5 9.5T480 64v384q0 14-9.5 23t-22.5 9H64q-14 0-23-9t-9-23V64q0-13 9-22.5T64 32h384zm0 32H64v384h384V64zM160 345V169q0-8 8-8h176q8 0 8 8v176q0 8-8 8H168q-8 0-8-8z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/tri-state";
export { pathData, ltr, accData };