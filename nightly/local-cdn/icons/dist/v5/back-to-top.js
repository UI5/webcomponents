import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_BACK_TO_TOP } from "../generated/i18n/i18n-defaults.js";

const name = "back-to-top";
const pathData = "m8.547 4.24 3.253 3.5a.75.75 0 0 1-1.1 1.02L8.75 6.663v8.588a.75.75 0 0 1-1.5 0V6.657L5.3 8.76a.75.75 0 0 1-1.1-1.02l3.248-3.5a.757.757 0 0 1 1.099 0ZM14.25 0a.75.75 0 0 1 0 1.5H1.75a.75.75 0 0 1 0-1.5h12.5Z";
const ltr = false;
const accData = ICON_BACK_TO_TOP;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, accData, collection, packageName });

export default "SAP-icons-v5/back-to-top";
export { pathData, ltr, viewBox, accData };