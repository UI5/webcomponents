import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_SORT_ASCENDING } from "../generated/i18n/i18n-defaults.js";

const name = "sort-ascending";
const pathData = "M358 147H154q-11 0-18.5-7t-7.5-18 7.5-18.5T154 96h204q11 0 18.5 7.5T384 122t-7.5 18-18.5 7zm64 128H90q-11 0-18.5-7T64 250t7.5-18.5T90 224h332q11 0 18.5 7.5T448 250t-7.5 18-18.5 7zm64 128H26q-11 0-18.5-7T0 378t7.5-18.5T26 352h460q11 0 18.5 7.5T512 378t-7.5 18-18.5 7z";
const ltr = false;
const accData = ICON_SORT_ASCENDING;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, accData, collection, packageName });

export default "SAP-icons-v5/sort-ascending";
export { pathData, ltr, accData };