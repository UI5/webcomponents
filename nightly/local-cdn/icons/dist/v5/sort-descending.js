import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_SORT_DESCENDING } from "../generated/i18n/i18n-defaults.js";

const name = "sort-descending";
const pathData = "M486 96q11 0 18.5 7.5T512 122t-7.5 18-18.5 7H26q-11 0-18.5-7T0 122t7.5-18.5T26 96h460zm-64 128q11 0 18.5 7.5T448 250t-7.5 18-18.5 7H90q-11 0-18.5-7T64 250t7.5-18.5T90 224h332zm-64 128q11 0 18.5 7.5T384 378t-7.5 18-18.5 7H154q-11 0-18.5-7t-7.5-18 7.5-18.5T154 352h204z";
const ltr = false;
const accData = ICON_SORT_DESCENDING;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, accData, collection, packageName });

export default "SAP-icons-v5/sort-descending";
export { pathData, ltr, accData };