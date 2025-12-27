import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_OVERFLOW } from "../generated/i18n/i18n-defaults.js";

const name = "overflow";
const pathData = "M448 192q26 0 45 19t19 45-19 45-45 19-45-19-19-45 19-45 45-19zm0 96q14 0 23-9t9-23-9-23-23-9-23 9-9 23 9 23 23 9zm-192-96q26 0 45 19t19 45-19 45-45 19-45-19-19-45 19-45 45-19zm0 96q14 0 23-9t9-23-9-23-23-9-23 9-9 23 9 23 23 9zM64 192q26 0 45 19t19 45-19 45-45 19-45-19-19-45 19-45 45-19zm0 96q14 0 23-9t9-23-9-23-23-9-23 9-9 23 9 23 23 9z";
const ltr = false;
const accData = ICON_OVERFLOW;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, accData, collection, packageName });

export default "SAP-icons-v4/overflow";
export { pathData, ltr, accData };