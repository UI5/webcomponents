import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_RESPONSE } from "../generated/i18n/i18n-defaults.js";

const name = "response";
const pathData = "M192 151q60 0 112.5 21t91.5 58.5 61.5 89T480 432v54q0 11-7.5 18.5T454 512t-18-7.5-7-18.5v-54q0-50-18.5-92.5t-50.5-73-75-47.5-93-17h-74l105 107q7 7 7 18t-7.5 18.5T204 353q-10 0-18-8L39 194q-7-7-7-18 0-10 7-17L186 8q8-8 18-8 11 0 18.5 7.5T230 26q0 10-7 17L118 151h74z";
const ltr = false;
const accData = ICON_RESPONSE;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, accData, collection, packageName });

export default "SAP-icons-v5/response";
export { pathData, ltr, accData };