import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "references";
const pathData = "M461 409H359v51h102v-51zm26-51q11 0 18 7.5t7 18.5v102q0 11-7 18t-18 7H333q-11 0-18.5-7t-7.5-18v-26h-25q-22 0-36.5-15T231 409V102h-26v26q0 11-7.5 18t-18.5 7H26q-11 0-18.5-7T0 128V26Q0 15 7.5 7.5T26 0h153q11 0 18.5 7.5T205 26v25h26q21 0 36 15t15 36v307h25v-25q0-11 7.5-18.5T333 358h154z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/references";
export { pathData, ltr, accData };