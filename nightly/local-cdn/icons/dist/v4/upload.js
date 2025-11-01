import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_UPLOAD } from "../generated/i18n/i18n-defaults.js";

const name = "upload";
const pathData = "M480 448q13 0 22.5 9.5T512 480q0 14-9.5 23t-22.5 9H32q-14 0-23-9t-9-23q0-13 9-22.5t23-9.5h448zm-98-337q12 11 0 23-5 5-11.5 5t-11.5-5l-87-87v321q0 16-16 16t-16-16V49l-85 85q-5 5-11 5t-11-5q-12-11 0-23L235 10q10-9 22.5-9.5T280 10z";
const ltr = false;
const accData = ICON_UPLOAD;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, accData, collection, packageName });

export default "SAP-icons-v4/upload";
export { pathData, ltr, accData };