import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_DELETE } from "../generated/i18n/i18n-defaults.js";

const name = "delete";
const pathData = "M10.25 0C11.216 0 12 .784 12 1.75V3.5h2.25a.75.75 0 0 1 0 1.5h-.75v9.25A1.75 1.75 0 0 1 11.75 16h-7.5a1.75 1.75 0 0 1-1.741-1.571L2.5 5h-.75a.75.75 0 0 1 0-1.5H4V1.75C4 .784 4.784 0 5.75 0h4.5ZM4.005 14.3a.25.25 0 0 0 .245.2h7.5a.25.25 0 0 0 .25-.25V5H4l.005 9.3ZM6.25 7a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 6.25 7Zm3.5 0a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 9.75 7Zm-4-5.5a.25.25 0 0 0-.25.25V3.5h5V1.75a.25.25 0 0 0-.25-.25h-4.5Z";
const ltr = false;
const accData = ICON_DELETE;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, accData, collection, packageName });

export default "SAP-icons-v5/delete";
export { pathData, ltr, viewBox, accData };