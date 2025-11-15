import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_SORT_DESCENDING } from "../generated/i18n/i18n-defaults.js";

const name = "sort-descending";
const pathData = "M17 96h478l-15 32H34zm431 96l-15 32H82l-17-32h383zm-335 96h287l-16 32H129zm48 96h192l-16 32H177z";
const ltr = false;
const accData = ICON_SORT_DESCENDING;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, accData, collection, packageName });

export default "SAP-icons-v4/sort-descending";
export { pathData, ltr, accData };