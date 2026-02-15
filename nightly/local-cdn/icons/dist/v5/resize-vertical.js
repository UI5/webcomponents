import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_RESIZE_VERTICAL } from "../generated/i18n/i18n-defaults.js";

const name = "resize-vertical";
const pathData = "M315 121l-59-59-59 59q-7 7-18 7t-18-7.5-7-18.5 7-18l77-77q7-7 18-7t18 7l77 77q8 8 8 18 0 11-7.5 18.5T333 128t-18-7zm139 103H58q-11 0-18.5-7.5T32 198t7.5-18 18.5-7h396q11 0 18.5 7t7.5 18-7.5 18.5T454 224zm0 115H58q-11 0-18.5-7T32 314t7.5-18.5T58 288h396q11 0 18.5 7.5T480 314t-7.5 18-18.5 7zM256 512q-9 0-18-7l-77-77q-7-7-7-19 0-11 7-18t18-7 18 7l59 59 59-59q7-7 18-7t18.5 7 7.5 18-8 19l-77 77q-7 7-18 7z";
const ltr = false;
const accData = ICON_RESIZE_VERTICAL;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, accData, collection, packageName });

export default "SAP-icons-v5/resize-vertical";
export { pathData, ltr, accData };