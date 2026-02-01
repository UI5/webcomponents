import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_EXPAND_GROUP } from "../generated/i18n/i18n-defaults.js";

const name = "expand-group";
const pathData = "M390 64q11 0 18.5 7.5T416 90q0 10-7 17L275 248q-8 8-19 8-12 0-18-8L103 107q-7-7-7-17 0-11 7.5-18.5T122 64q10 0 18 8l116 121L372 72q8-8 18-8zm0 192q11 0 18.5 7.5T416 282q0 10-7 17L275 440q-8 8-19 8-12 0-18-8L103 299q-7-7-7-17 0-11 7.5-18.5T122 256q10 0 18 8l116 121 116-121q8-8 18-8z";
const ltr = false;
const accData = ICON_EXPAND_GROUP;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, accData, collection, packageName });

export default "SAP-icons-v5/expand-group";
export { pathData, ltr, accData };