import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_EXPAND_GROUP } from "../generated/i18n/i18n-defaults.js";

const name = "expand-group";
const pathData = "M11.706 8.236a.75.75 0 1 1 1.09 1.029l-4.248 4.5a.758.758 0 0 1-1.09 0l-4.253-4.5a.75.75 0 1 1 1.09-1.03l3.708 3.923 3.703-3.922Zm0-6a.75.75 0 1 1 1.09 1.029l-4.248 4.5a.758.758 0 0 1-1.09 0l-4.253-4.5a.75.75 0 1 1 1.09-1.03l3.708 3.923 3.703-3.922Z";
const ltr = false;
const accData = ICON_EXPAND_GROUP;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, accData, collection, packageName });

export default "SAP-icons-v5/expand-group";
export { pathData, ltr, viewBox, accData };