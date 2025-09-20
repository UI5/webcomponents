import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "busy";
const pathData = "M256 0q53 0 100 20t81.5 55 54.5 81.5 20 99.5-20 100-54.5 81.5T356 492t-100 20-99.5-20T75 437.5 20 356 0 256t20-99.5T75 75t81.5-55T256 0zm0 342q18 0 33.5-7t27-18.5 18.5-27 7-33.5-7-33.5-18.5-27-27-18T256 171q-35 0-60 25t-25 60q0 18 6.5 33.5t18 27 27 18.5 33.5 7z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/busy";
export { pathData, ltr, accData };