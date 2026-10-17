import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "add-outside";
const pathData = "M14 223c-7 0-14-6-14-14v-28c0-8 7-14 14-14h153V14c0-8 7-14 14-14h28c9 0 14 5 14 14v153h153c9 0 14 5 14 14v28c0 9-5 14-14 14H223v153c0 9-5 14-14 14h-28c-7 0-14-6-14-14V223H14zm242 273v-16c0-71 58-128 128-128h80l-75-69c-3-4-5-8-5-12 0-8 8-16 16-16 4 0 8 2 11 5l92 83c12 13 12 33 0 46l-92 86c-3 3-7 5-11 5-2 0-6-2-11-5-3-4-5-8-5-12s2-8 5-11l75-68h-80c-53 0-96 43-96 96v16c0 11-5 16-16 16s-16-5-16-16z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/add-outside";
export { pathData, ltr, accData };