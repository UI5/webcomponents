import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_IPAD } from "../generated/i18n/i18n-defaults.js";

const name = "ipad-2";
const pathData = "M32 448q-13 0-22.5-9.5T0 416V96q0-14 9.5-23T32 64h448q14 0 23 9t9 23v320q0 13-9 22.5t-23 9.5H32zm64-32h352V96H96v320zM56 232q-10 0-17 7t-7 17 7 17 17 7q11 0 17.5-7t6.5-17-6.5-17-17.5-7z";
const ltr = false;
const accData = ICON_IPAD;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, accData, collection, packageName });

export default "SAP-icons-v4/ipad-2";
export { pathData, ltr, accData };