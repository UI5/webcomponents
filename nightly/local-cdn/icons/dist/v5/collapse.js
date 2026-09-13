import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_COLLAPSE } from "../generated/i18n/i18n-defaults.js";

const name = "collapse";
const pathData = "m8.544 9.236 4.252 4.5a.75.75 0 0 1-1.09 1.03l-3.708-3.923-3.703 3.922a.75.75 0 0 1-1.09-1.03l4.248-4.5a.757.757 0 0 1 1.09 0Zm3.162-8a.75.75 0 1 1 1.09 1.03l-4.252 4.5a.758.758 0 0 1-1.091 0l-4.247-4.5a.75.75 0 1 1 1.09-1.03l3.702 3.922 3.708-3.922Z";
const ltr = false;
const accData = ICON_COLLAPSE;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, accData, collection, packageName });

export default "SAP-icons-v5/collapse";
export { pathData, ltr, viewBox, accData };