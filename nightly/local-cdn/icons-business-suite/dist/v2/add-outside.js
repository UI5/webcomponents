import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "add-outside";
const pathData = "M219.5 456v-72c0-92 74-167 167-167h38l-30-31c-11-9-11-24 0-33 5-5 11-7 17-7s12 2 16 7l72 71c3 3 3 5 4 8 0 1 1 0 1 1 1 1 2 3 2 7v2c0 3-1 5-2 7v1c-1 3-4 4-5 7v1l-72 71c-5 5-10 7-16 7-7 0-12-2-17-7-11-9-11-24 0-33l30-31h-38c-66 0-119 53-119 119v72c0 13-11 24-24 24-15 0-24-11-24-24zm-190-263c-13 0-24-11-24-24s11-24 24-24h119V26c0-13 11-24 24-24s24 11 24 24v119h120c13 0 24 11 24 24s-11 24-24 24h-120v120c0 13-11 24-24 24s-24-11-24-24V193h-119z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/add-outside";
export { pathData, ltr, accData };