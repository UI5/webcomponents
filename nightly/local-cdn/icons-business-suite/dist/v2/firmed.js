import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "firmed";
const pathData = "M256 0c131 0 240 109 240 240 0 132-109 240-240 240-132 0-240-108-240-240C16 109 124 0 256 0zM64 240c0 107 85 192 192 192 106 0 191-85 191-192 0-106-85-191-191-191-107 0-192 85-192 191zm264-52v17c15 7 24 22 24 41v72c0 27-21 48-48 48h-96c-27 0-49-21-49-48v-71c0-17 9-35 24-42v-18c0-45 38-78 83-71 37 4 62 36 62 72zm-96 11h48v-24c0-17-8-25-24-25s-24 8-24 25v24zm-24 119h96v-72h-96v72z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/firmed";
export { pathData, ltr, accData };