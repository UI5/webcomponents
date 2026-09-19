import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_MESSAGE_SUCCESS } from "../generated/i18n/i18n-defaults.js";

const name = "message-success";
const pathData = "M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0Zm0 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13Zm1.68 4.262a.75.75 0 0 1 1.14.976l-3 3.5a.758.758 0 0 1-1.1.042l-1.5-1.5a.75.75 0 1 1 1.06-1.06l.927.926 2.474-2.884Z";
const ltr = true;
const accData = ICON_MESSAGE_SUCCESS;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, accData, collection, packageName });

export default "SAP-icons-v5/message-success";
export { pathData, ltr, viewBox, accData };