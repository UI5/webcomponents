import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_IPAD } from "../generated/i18n/i18n-defaults.js";

const name = "ipad-2";
const pathData = "M512 405q0 31-21 53t-51 22H72q-30 0-51-22T0 405V107q0-31 21-53t51-22h368q30 0 51 22t21 53v298zM74 429h364V83H74v346z";
const ltr = false;
const accData = ICON_IPAD;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, accData, collection, packageName });

export default "SAP-icons-v5/ipad-2";
export { pathData, ltr, accData };