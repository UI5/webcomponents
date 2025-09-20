import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "create-dashboard";
const pathData = "M24 96l96-96h288v109h-32V32H152v96H56v352h320v-78h32v110H24V96zm320 189v-48h48v-48h48v48h48v48h-48v48h-48v-48h-48zm-32-29H88v-37h224v37zM88 292h224v37H88v-37zm224 110H88v-37h224v37z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/create-dashboard";
export { pathData, ltr, accData };