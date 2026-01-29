import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_IPAD } from "../generated/i18n/i18n-defaults.js";

const name = "ipad";
const pathData = "M405 0q31 0 53 21t22 51v368q0 30-22 51t-53 21H107q-31 0-53-21t-22-51V72q0-30 22-51t53-21h298zm24 438V74H83v364h346z";
const ltr = false;
const accData = ICON_IPAD;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, accData, collection, packageName });

export default "SAP-icons-v5/ipad";
export { pathData, ltr, accData };