import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_ADD_FILTER } from "../generated/i18n/i18n-defaults.js";

const name = "add-filter";
const pathData = "M358 0q11 0 18.5 7.5T384 26q0 8-5 15L256 199v105q0 13-11 21l-77 54q-7 5-14 5-11 0-18.5-7.5T128 358V199L5 41q-5-7-5-15Q0 15 7.5 7.5T26 0h332zm-52 51H78l96 124q5 7 5 16v118l26-18V191q0-9 5-16zm180 323q11 0 18.5 7.5T512 400t-7.5 18.5T486 426h-60v60q0 11-7.5 18.5T400 512t-18.5-7.5T374 486v-60h-60q-11 0-18.5-7.5T288 400t7.5-18.5T314 374h60v-60q0-11 7.5-18.5T400 288t18.5 7.5T426 314v60h60z";
const ltr = false;
const accData = ICON_ADD_FILTER;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, accData, collection, packageName });

export default "SAP-icons-v5/add-filter";
export { pathData, ltr, accData };