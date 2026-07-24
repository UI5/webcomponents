import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "dispatched-deallocate";
const pathData = "M256 0c142 0 256 115 256 256S398 512 256 512C115 512 0 397 0 256S115 0 256 0zm0 480c124 0 224-100 224-224S380 32 256 32 32 132 32 256s100 224 224 224zm0-272h80l-75-69c-3-4-5-8-5-12s2-8 5-11 7-5 11-5c4 1 8 2 11 5l92 83c12 13 12 33 0 46l-92 86c-3 3-7 5-11 5-2 0-6-2-11-5-3-4-5-8-5-12s2-8 5-11l75-68h-80c-53 0-96 43-96 96v16c0 11-5 16-16 16s-16-5-16-16v-16c0-71 58-128 128-128z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/dispatched-deallocate";
export { pathData, ltr, accData };