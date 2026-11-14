import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_SORT_DESCENDING } from "../generated/i18n/i18n-defaults.js";

const name = "sort-descending";
const pathData = "M1 3h14l-.44 1H1.499L1 3Zm12.623 3-.439 1H2.904l-.498-1h11.217ZM3.812 9h8.406l-.469 1H4.28l-.468-1Zm1.406 3h5.623l-.469 1H5.686l-.468-1Z";
const ltr = false;
const accData = ICON_SORT_DESCENDING;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, accData, collection, packageName });

export default "SAP-icons-v4/sort-descending";
export { pathData, ltr, viewBox, accData };