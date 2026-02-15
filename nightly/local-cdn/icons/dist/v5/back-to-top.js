import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_BACK_TO_TOP } from "../generated/i18n/i18n-defaults.js";

const name = "back-to-top";
const pathData = "M26 51q-11 0-18.5-7T0 26 7.5 7.5 26 0h460q11 0 18.5 7.5T512 26t-7.5 18-18.5 7H26zm363 200q8 8 8 18 0 11-7.5 18t-18.5 7-18-7l-71-72v271q0 11-7.5 18.5T256 512t-18.5-7.5T230 486V215l-71 72q-7 7-18 7t-18.5-7-7.5-18q0-10 8-18l115-116q9-7 18-7t18 7z";
const ltr = false;
const accData = ICON_BACK_TO_TOP;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, accData, collection, packageName });

export default "SAP-icons-v5/back-to-top";
export { pathData, ltr, accData };