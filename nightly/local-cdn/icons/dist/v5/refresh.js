import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_REFRESH } from "../generated/i18n/i18n-defaults.js";

const name = "refresh";
const pathData = "M15.25 0a.75.75 0 0 1 .75.75v5a.75.75 0 0 1-.75.75h-5a.75.75 0 0 1 0-1.5h3.517a6.5 6.5 0 1 0 .51 4.7s.084-.354.098-.425a.75.75 0 1 1 1.472.293s-.1.435-.123.522A8 8 0 1 1 14.5 3.336V.75a.75.75 0 0 1 .75-.75Z";
const ltr = false;
const accData = ICON_REFRESH;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, accData, collection, packageName });

export default "SAP-icons-v5/refresh";
export { pathData, ltr, viewBox, accData };