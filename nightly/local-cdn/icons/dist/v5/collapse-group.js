import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_COLLAPSE_GROUP } from "../generated/i18n/i18n-defaults.js";

const name = "collapse-group";
const pathData = "m8.548 8.235 4.248 4.5a.75.75 0 0 1-1.09 1.03L8.003 9.843l-3.708 3.922a.75.75 0 1 1-1.09-1.03l4.252-4.5a.757.757 0 0 1 1.091 0Zm0-6 4.248 4.5a.75.75 0 0 1-1.09 1.03L8.003 3.843 4.295 7.765a.75.75 0 0 1-1.09-1.03l4.252-4.5a.757.757 0 0 1 1.091 0Z";
const ltr = false;
const accData = ICON_COLLAPSE_GROUP;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, accData, collection, packageName });

export default "SAP-icons-v5/collapse-group";
export { pathData, ltr, viewBox, accData };