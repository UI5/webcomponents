import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_RESIZE_HORIZONTAL } from "../generated/i18n/i18n-defaults.js";

const name = "resize-horizontal";
const pathData = "M198 480q-11 0-18-7.5t-7-18.5V58q0-11 7-18.5t18-7.5 18.5 7.5T224 58v396q0 11-7.5 18.5T198 480zm116 0q-11 0-18.5-7.5T288 454V58q0-11 7.5-18.5T314 32t18 7.5 7 18.5v396q0 11-7 18.5t-18 7.5zM103 358q-12 0-19-7L8 274q-8-8-8-18t8-18l76-77q8-8 19-8t18 7.5 7 18.5-7 18l-59 59 59 59q7 7 7 18t-7 18-18 7zm307 0q-11 0-18-7t-7-18 7-18l59-59-59-59q-7-7-7-18t7-18.5 18-7.5 19 8l76 77q7 6 7 18 0 11-7 18l-76 77q-7 7-19 7z";
const ltr = false;
const accData = ICON_RESIZE_HORIZONTAL;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, accData, collection, packageName });

export default "SAP-icons-v5/resize-horizontal";
export { pathData, ltr, accData };