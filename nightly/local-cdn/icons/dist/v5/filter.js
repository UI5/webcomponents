import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_FILTER } from "../generated/i18n/i18n-defaults.js";

const name = "filter";
const pathData = "M218 480q-11 0-18.5-7.5T192 454V265L38 74q-6-8-6-16 0-11 7.5-18.5T58 32h396q11 0 18.5 7.5T480 58q0 8-6 16L320 265v125q0 12-9 20l-77 64q-7 6-16 6zM111 83l126 157q6 6 6 16v144l26-22V256q0-9 5-16L401 83H111z";
const ltr = false;
const accData = ICON_FILTER;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, accData, collection, packageName });

export default "SAP-icons-v5/filter";
export { pathData, ltr, accData };