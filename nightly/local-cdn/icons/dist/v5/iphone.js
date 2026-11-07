import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_IPHONE } from "../generated/i18n/i18n-defaults.js";

const name = "iphone";
const pathData = "M11.5 2.75c0-.69-.56-1.25-1.25-1.25h-4.5c-.69 0-1.25.56-1.25 1.25v10.5c0 .69.56 1.25 1.25 1.25h4.5c.69 0 1.25-.56 1.25-1.25V2.75Zm1.5 10.5A2.75 2.75 0 0 1 10.25 16h-4.5A2.75 2.75 0 0 1 3 13.25V2.75A2.75 2.75 0 0 1 5.75 0h4.5A2.75 2.75 0 0 1 13 2.75v10.5Z";
const ltr = false;
const accData = ICON_IPHONE;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, accData, collection, packageName });

export default "SAP-icons-v5/iphone";
export { pathData, ltr, viewBox, accData };