import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_SORT_ASCENDING } from "../generated/i18n/i18n-defaults.js";

const name = "sort-ascending";
const pathData = "M15 13H1l.44-1h13.062L15 13ZM2.377 10l.439-1h10.28l.498 1H2.377Zm9.811-3H3.782l.47-1h7.468l.468 1Zm-1.406-3H5.16l.469-1h4.686l.468 1Z";
const ltr = false;
const accData = ICON_SORT_ASCENDING;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, accData, collection, packageName });

export default "SAP-icons-v4/sort-ascending";
export { pathData, ltr, viewBox, accData };