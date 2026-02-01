import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_EXPAND_GROUP } from "../generated/i18n/i18n-defaults.js";

const name = "expand-group";
const pathData = "M425.5 234q9-9 22.5-9t22.5 9q10 10 10 23t-10 23l-192 192q-9 9-22.5 9t-22.5-9l-193-191q-10-10-10-23t10-22q9-10 22-10t23 10l159 157q11 11 23 0zm0-193q9-9 22.5-9t22.5 9q10 10 10 23t-10 23l-192 192q-9 9-22.5 9t-22.5-9L40.5 88q-10-10-10-23t10-22q9-10 22-10t23 10l159 157q5 5 11.5 5t11.5-5z";
const ltr = false;
const accData = ICON_EXPAND_GROUP;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, accData, collection, packageName });

export default "SAP-icons-v4/expand-group";
export { pathData, ltr, accData };