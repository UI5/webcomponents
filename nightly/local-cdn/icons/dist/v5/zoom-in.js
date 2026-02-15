import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_ZOOM_IN } from "../generated/i18n/i18n-defaults.js";

const name = "zoom-in";
const pathData = "M473 436q7 7 7 18t-7.5 18.5T454 480q-10 0-18-8l-95-95q-51 39-117 39-40 0-75-15t-61-41-41-61-15-75 15-75 41-61 61-41 75-15 75 15 61 41 41 61 15 75q0 64-39 117zM83 224q0 30 11 55.5t30 44.5 44.5 30 55.5 11 55.5-11 44.5-30 30-44.5 11-55.5-11-55.5-30-44.5-44.5-30T224 83t-55.5 11-44.5 30-30 44.5T83 224zm253 0q0 11-7.5 18.5T310 250h-60v60q0 11-7.5 18.5T224 336t-18.5-7.5T198 310v-60h-60q-11 0-18.5-7.5T112 224t7.5-18.5T138 198h60v-60q0-11 7.5-18.5T224 112t18.5 7.5T250 138v60h60q11 0 18.5 7.5T336 224z";
const ltr = false;
const accData = ICON_ZOOM_IN;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, accData, collection, packageName });

export default "SAP-icons-v5/zoom-in";
export { pathData, ltr, accData };