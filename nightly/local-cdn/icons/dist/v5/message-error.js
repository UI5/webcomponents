import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_MESSAGE_ERROR } from "../generated/i18n/i18n-defaults.js";

const name = "message-error";
const pathData = "M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0Zm0 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13Zm1.72 3.72a.75.75 0 0 1 1.06 1.06L9.06 8l1.72 1.72a.75.75 0 0 1-1.06 1.06L8 9.06l-1.72 1.72a.75.75 0 0 1-1.06-1.06L6.94 8 5.22 6.28a.75.75 0 1 1 1.06-1.06L8 6.94l1.72-1.72Z";
const ltr = false;
const accData = ICON_MESSAGE_ERROR;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, accData, collection, packageName });

export default "SAP-icons-v5/message-error";
export { pathData, ltr, viewBox, accData };