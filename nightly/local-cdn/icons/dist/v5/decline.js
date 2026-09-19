import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_DECLINE } from "../generated/i18n/i18n-defaults.js";

const name = "decline";
const pathData = "M11.72 3.22a.75.75 0 1 1 1.06 1.06L9.06 8l3.72 3.72a.75.75 0 1 1-1.06 1.06L8 9.06l-3.72 3.72a.75.75 0 0 1-1.06-1.06L6.94 8 3.22 4.28a.75.75 0 1 1 1.06-1.06L8 6.94l3.72-3.72Z";
const ltr = false;
const accData = ICON_DECLINE;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, accData, collection, packageName });

export default "SAP-icons-v5/decline";
export { pathData, ltr, viewBox, accData };