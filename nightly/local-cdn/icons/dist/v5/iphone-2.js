import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_IPHONE } from "../generated/i18n/i18n-defaults.js";

const name = "iphone-2";
const pathData = "M14.5 5.25c0-.69-.56-1.25-1.25-1.25H2.75c-.69 0-1.25.56-1.25 1.25v5.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-5.5Zm1.5 5.5a2.75 2.75 0 0 1-2.75 2.75H2.75A2.75 2.75 0 0 1 0 10.75v-5.5A2.75 2.75 0 0 1 2.75 2.5h10.5A2.75 2.75 0 0 1 16 5.25v5.5Z";
const ltr = false;
const accData = ICON_IPHONE;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, accData, collection, packageName });

export default "SAP-icons-v5/iphone-2";
export { pathData, ltr, viewBox, accData };