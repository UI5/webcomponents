import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_UPLOAD } from "../generated/i18n/i18n-defaults.js";

const name = "upload";
const pathData = "M15.25 14.5a.75.75 0 0 1 0 1.5H.75a.75.75 0 0 1 0-1.5h14.5ZM8.552.24l3.248 3.5a.75.75 0 0 1-1.1 1.02L8.75 2.657v8.593a.75.75 0 0 1-1.5 0V2.662L5.3 4.761a.75.75 0 0 1-1.1-1.022L7.453.24a.757.757 0 0 1 1.099 0Z";
const ltr = false;
const accData = ICON_UPLOAD;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, accData, collection, packageName });

export default "SAP-icons-v5/upload";
export { pathData, ltr, viewBox, accData };