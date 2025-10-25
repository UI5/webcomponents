import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "add-note";
const pathData = "M103 480c-40 0-73-33-73-73V123c0-40 33-73 73-73h22c0-27 22-48 49-48h95c27 0 48 21 48 48h23c40 0 73 33 73 73v95c0 13-12 24-24 24-13 0-25-11-25-24v-95c0-13-11-26-24-26h-23c0 27-21 48-48 48h-95c-27 0-49-20-49-47l-22-1c-13 0-25 13-25 26v284c0 13 12 24 25 24h119c13 0 24 12 24 25 0 12-11 24-24 24H103zm214-71c-12 0-24-12-24-25 0-12 12-24 24-24h47v-47c0-13 12-24 25-24 12 0 24 11 24 24v47h47c12 0 24 12 24 24 0 13-12 25-24 25h-47v47c0 12-12 24-24 24-13 0-25-12-25-24v-47h-47zM174 50v48h95V50h-95z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/add-note";
export { pathData, ltr, accData };