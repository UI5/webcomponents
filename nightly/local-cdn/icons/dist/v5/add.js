import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_ADD } from "../generated/i18n/i18n-defaults.js";

const name = "add";
const pathData = "M454 230q11 0 18.5 7.5T480 256t-7.5 18.5T454 282H282v172q0 11-7.5 18.5T256 480t-18.5-7.5T230 454V282H58q-11 0-18.5-7.5T32 256t7.5-18.5T58 230h172V58q0-11 7.5-18.5T256 32t18.5 7.5T282 58v172h172z";
const ltr = false;
const accData = ICON_ADD;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, accData, collection, packageName });

export default "SAP-icons-v5/add";
export { pathData, ltr, accData };