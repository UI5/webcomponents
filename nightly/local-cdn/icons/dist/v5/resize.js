import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_RESIZE } from "../generated/i18n/i18n-defaults.js";

const name = "resize";
const pathData = "M15.25 0a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0V2.56L2.56 14.5h1.69a.75.75 0 0 1 0 1.5H.75a.75.75 0 0 1-.75-.75v-3.5a.75.75 0 0 1 1.5 0v1.69L13.44 1.5h-1.69a.75.75 0 0 1 0-1.5h3.5Zm-1 8a.75.75 0 0 1 .75.75v4.5A1.75 1.75 0 0 1 13.25 15h-4.5a.75.75 0 0 1 0-1.5h4.5a.25.25 0 0 0 .25-.25v-4.5a.75.75 0 0 1 .75-.75Zm-7-7a.75.75 0 0 1 0 1.5h-4.5a.25.25 0 0 0-.25.25v4.5a.75.75 0 0 1-1.5 0v-4.5C1 1.784 1.784 1 2.75 1h4.5Z";
const ltr = false;
const accData = ICON_RESIZE;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, accData, collection, packageName });

export default "SAP-icons-v5/resize";
export { pathData, ltr, viewBox, accData };