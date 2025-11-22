import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "data-input-arrow";
const pathData = "M441 253L263 127v75H50v103h213v74zm60-21q10 6 10 21 0 14-10 21L256 447q-8 5-15 5h-3q-11 0-18.5-7.5T212 426v-70H24q-10 0-17.5-7.5T-1 330V176q0-10 7.5-17.5T24 151h188V80q0-11 7.5-18.5T238 54q5 0 10 1.5t8 4.5z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/data-input-arrow";
export { pathData, ltr, accData };