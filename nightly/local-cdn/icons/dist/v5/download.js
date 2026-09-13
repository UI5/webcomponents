import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_DOWNLOAD } from "../generated/i18n/i18n-defaults.js";

const name = "download";
const pathData = "M15.25 14.5a.75.75 0 0 1 0 1.5H.75a.75.75 0 0 1 0-1.5h14.5ZM8 0a.75.75 0 0 1 .75.75v8.592L10.7 7.24a.75.75 0 0 1 1.1 1.02l-3.248 3.5a.757.757 0 0 1-1.099 0L4.2 8.26a.75.75 0 0 1 1.1-1.02l1.95 2.097V.75A.75.75 0 0 1 8 0Z";
const ltr = false;
const accData = ICON_DOWNLOAD;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, accData, collection, packageName });

export default "SAP-icons-v5/download";
export { pathData, ltr, viewBox, accData };