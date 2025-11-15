import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_OVERFLOW } from "../generated/i18n/i18n-defaults.js";

const name = "overflow";
const pathData = "M64 192q26 0 45 19t19 45-19 45-45 19-45-19-19-45 19-45 45-19zm192 0q26 0 45 19t19 45-19 45-45 19-45-19-19-45 19-45 45-19zm192 0q26 0 45 19t19 45-19 45-45 19-45-19-19-45 19-45 45-19z";
const ltr = false;
const accData = ICON_OVERFLOW;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, accData, collection, packageName });

export default "SAP-icons-v5/overflow";
export { pathData, ltr, accData };