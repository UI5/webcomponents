import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_COLLAPSE_GROUP } from "../generated/i18n/i18n-defaults.js";

const name = "collapse-group";
const pathData = "M390 256q-10 0-18-8L256 127 140 248q-8 8-18 8-11 0-18.5-7.5T96 230q0-10 7-17L238 72q6-8 18-8 11 0 19 8l134 141q7 7 7 17 0 11-7.5 18.5T390 256zm0 192q-10 0-18-8L256 319 140 440q-8 8-18 8-11 0-18.5-7.5T96 422q0-10 7-17l135-141q6-8 18-8 11 0 19 8l134 141q7 7 7 17 0 11-7.5 18.5T390 448z";
const ltr = false;
const accData = ICON_COLLAPSE_GROUP;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, accData, collection, packageName });

export default "SAP-icons-v5/collapse-group";
export { pathData, ltr, accData };