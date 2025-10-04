import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_UP } from "../generated/i18n/i18n-defaults.js";

const name = "up";
const pathData = "M256 32l256 448H0zm0 64L64 448h384z";
const ltr = false;
const accData = ICON_UP;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, accData, collection, packageName });

export default "SAP-icons-v4/up";
export { pathData, ltr, accData };