import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_COLLAPSE_GROUP } from "../generated/i18n/i18n-defaults.js";

const name = "collapse-group";
const pathData = "M267.5 120q-12-11-23 0l-159 157q-10 10-23 10t-22-10q-10-9-10-22t10-23l193-191q9-9 22.5-9t22.5 9l192 192q10 10 10 23t-10 23q-9 9-22.5 9t-22.5-9zm0 193q-12-11-23 0l-159 157q-10 10-23 10t-22-10q-10-9-10-22t10-23l193-191q9-9 22.5-9t22.5 9l192 192q10 10 10 23t-10 23q-9 9-22.5 9t-22.5-9z";
const ltr = false;
const accData = ICON_COLLAPSE_GROUP;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, accData, collection, packageName });

export default "SAP-icons-v4/collapse-group";
export { pathData, ltr, accData };