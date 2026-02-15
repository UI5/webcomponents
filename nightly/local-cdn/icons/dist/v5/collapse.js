import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_COLLAPSE } from "../generated/i18n/i18n-defaults.js";

const name = "collapse";
const pathData = "M256 224q-12 0-18-8L103 75q-7-7-7-17 0-11 7.5-18.5T122 32q10 0 18 8l116 121L372 40q8-8 18-8 11 0 18.5 7.5T416 58q0 10-7 17L275 216q-8 8-19 8zm134 256q-10 0-18-8L256 351 140 472q-8 8-18 8-11 0-18.5-7.5T96 454q0-10 7-17l135-141q6-8 18-8 11 0 19 8l134 141q7 7 7 17 0 11-7.5 18.5T390 480z";
const ltr = false;
const accData = ICON_COLLAPSE;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, accData, collection, packageName });

export default "SAP-icons-v5/collapse";
export { pathData, ltr, accData };