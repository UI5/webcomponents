import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_IPHONE } from "../generated/i18n/i18n-defaults.js";

const name = "iphone";
const pathData = "M346 512H166q-29 0-49.5-22.5T96 435V77q0-32 20.5-54.5T166 0h180q29 0 49.5 22.5T416 77v358q0 32-20.5 54.5T346 512zM166 51q-8 0-13.5 7.5T147 77v358q0 11 5.5 18.5T166 461h180q8 0 13.5-7.5T365 435V77q0-11-5.5-18.5T346 51H166z";
const ltr = false;
const accData = ICON_IPHONE;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, accData, collection, packageName });

export default "SAP-icons-v5/iphone";
export { pathData, ltr, accData };