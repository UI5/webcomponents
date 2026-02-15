import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_SEARCH } from "../generated/i18n/i18n-defaults.js";

const name = "search";
const pathData = "M470 426q10 9 10 22.5T470 471q-9 9-22 9t-23-9L308 353q-45 31-100 31-36 0-68-13.5T84 333t-38-56-14-69q0-36 14-68t38-56 56-38 68-14 68 14 56 38 38 56 14 68q0 28-8.5 53T353 308zm-262-74q30 0 56-11t45.5-30.5 31-46T352 208t-11.5-56-31-45.5-45.5-31T208 64t-56.5 11.5-46 31T75 152t-11 56 11 56.5 30.5 46 46 30.5 56.5 11z";
const ltr = true;
const accData = ICON_SEARCH;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, accData, collection, packageName });

export default "SAP-icons-v4/search";
export { pathData, ltr, accData };