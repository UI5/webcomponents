import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_DOWN } from "../generated/i18n/i18n-defaults.js";

const name = "down";
const pathData = "M0 32h512L256 480zm64 32l192 352L448 64H64z";
const ltr = false;
const accData = ICON_DOWN;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, accData, collection, packageName });

export default "SAP-icons-v4/down";
export { pathData, ltr, accData };