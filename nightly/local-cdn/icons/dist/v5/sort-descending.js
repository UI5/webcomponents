import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_SORT_DESCENDING } from "../generated/i18n/i18n-defaults.js";

const name = "sort-descending";
const pathData = "M11.25 11a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1 0-1.5h6.5Zm2-4a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1 0-1.5h10.5Zm2-3.5a.75.75 0 0 1 0 1.5H.75a.75.75 0 0 1 0-1.5h14.5Z";
const ltr = false;
const accData = ICON_SORT_DESCENDING;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, accData, collection, packageName });

export default "SAP-icons-v5/sort-descending";
export { pathData, ltr, viewBox, accData };