import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_SAVE } from "../generated/i18n/i18n-defaults.js";

const name = "save";
const pathData = "M10.61 1c.175 0 .298.105.402.202l3.75 3.5A.75.75 0 0 1 15 5.25v8A1.75 1.75 0 0 1 13.25 15H2.75A1.75 1.75 0 0 1 1 13.25V2.75C1 1.784 1.784 1 2.75 1h7.86ZM2.75 2.5a.25.25 0 0 0-.25.25v10.5c0 .138.112.25.25.25H4.5V9.75A.75.75 0 0 1 5.25 9h5.5a.75.75 0 0 1 .75.75v3.75h1.75a.25.25 0 0 0 .25-.25V5.575L10.205 2.5H6v2h3.25a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1-.75-.75V2.5H2.75ZM6 13.5h4v-3H6v3Z";
const ltr = false;
const accData = ICON_SAVE;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, accData, collection, packageName });

export default "SAP-icons-v5/save";
export { pathData, ltr, viewBox, accData };