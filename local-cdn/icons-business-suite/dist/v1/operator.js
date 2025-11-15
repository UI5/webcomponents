import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "operator";
const pathData = "M110 163v-35h24c3-51 37-92 85-107 7-13 21-22 38-22 16 0 30 9 38 22 47 15 81 56 84 107h24v35H110zM292 53l9 75h47c0-41-32-75-56-75zm-127 75h47l9-75c-24 0-56 34-56 75zM97 511V401c0-11 3-24 8-38 5-11 11-19 20-30 13-12 37-27 56-27l12 91 32-91c-56-20-78-58-78-117h221c0 4 1 7 1 10 0 51-33 92-81 107l32 91 12-91c19 0 43 15 56 27 9 11 15 19 20 30 5 14 8 27 8 38v110H97z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/operator";
export { pathData, ltr, accData };