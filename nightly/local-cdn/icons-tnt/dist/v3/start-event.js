import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "start-event";
const pathData = "M256 51q-42 0-79.5 16T111 111t-44 65.5T51 256t16 79.5 44 65 65.5 43.5 79.5 16 79.5-16 65.5-43.5 44-65 16-79.5-16-79.5-44-65.5-65.5-44T256 51zm0 460q-53 0-99.5-20T75 436.5t-55-81T0 256t20-100 55-81.5T156.5 20 256 0t99.5 20T437 74.5t55 81.5 20 100-20 99.5-55 81-81.5 54.5-99.5 20z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/start-event";
export { pathData, ltr, accData };