import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_RESPONSE } from "../generated/i18n/i18n-defaults.js";

const name = "response";
const pathData = "M6.795 1.236a.75.75 0 0 0-1.06-.03l-4.5 4.246a.751.751 0 0 0 0 1.091l4.5 4.252a.75.75 0 0 0 1.03-1.09L3.639 6.75H7.25A6.25 6.25 0 0 1 13.5 13v1.25a.75.75 0 0 0 1.5 0V13a7.75 7.75 0 0 0-7.75-7.75H3.634l3.13-2.955a.75.75 0 0 0 .03-1.06Z";
const ltr = false;
const accData = ICON_RESPONSE;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, accData, collection, packageName });

export default "SAP-icons-v5/response";
export { pathData, ltr, viewBox, accData };