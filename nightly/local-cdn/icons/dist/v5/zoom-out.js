import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_ZOOM_OUT } from "../generated/i18n/i18n-defaults.js";

const name = "zoom-out";
const pathData = "M7 1a6 6 0 0 1 4.738 9.678l3.042 3.042a.75.75 0 1 1-1.06 1.06l-3.042-3.042A6 6 0 1 1 7 1Zm0 1.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Zm2.25 3.75a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5h4.5Z";
const ltr = false;
const accData = ICON_ZOOM_OUT;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, accData, collection, packageName });

export default "SAP-icons-v5/zoom-out";
export { pathData, ltr, viewBox, accData };