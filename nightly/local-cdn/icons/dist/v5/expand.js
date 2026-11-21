import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_EXPAND } from "../generated/i18n/i18n-defaults.js";

const name = "expand";
const pathData = "M10.7 10.244a.75.75 0 0 1 1.1 1.022l-3.253 3.502a.757.757 0 0 1-1.098-.001L4.2 11.265a.75.75 0 0 1 1.1-1.02l2.697 2.909 2.704-2.91ZM8.547 1.239 11.8 4.741a.752.752 0 0 1-1.1 1.022l-2.703-2.91L5.3 5.764a.75.75 0 1 1-1.1-1.02L7.45 1.24a.757.757 0 0 1 1.098 0Z";
const ltr = false;
const accData = ICON_EXPAND;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, accData, collection, packageName });

export default "SAP-icons-v5/expand";
export { pathData, ltr, viewBox, accData };