import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "unfirmed";
const pathData = "M256 2c131 0 239 108 239 239S387 480 256 480 17 372 17 241 125 2 256 2zm0 430c105 0 191-86 191-191S361 50 256 50 65 136 65 241s86 191 191 191zm-24-215h72c27 0 48 21 48 48v72c0 27-21 47-48 47h-96c-27 0-48-20-48-47v-72c0-19 8-32 24-41v-55c0-40 32-71 72-71s72 31 72 71c0 13-11 24-24 24s-24-11-24-24-11-24-24-24-24 11-24 24v48zm-24 120h96v-72h-96v72z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/unfirmed";
export { pathData, ltr, accData };