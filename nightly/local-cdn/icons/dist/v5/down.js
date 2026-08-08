import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_DOWN } from "../generated/i18n/i18n-defaults.js";

const name = "down";
const pathData = "M14.246 1c1.357 0 2.197 1.478 1.504 2.645L9.507 14.148a1.75 1.75 0 0 1-3.01 0L.25 3.645C-.445 2.478.395 1 1.753 1h12.493ZM1.753 2.5a.25.25 0 0 0-.215.378l6.249 10.504a.25.25 0 0 0 .43 0l6.244-10.504a.25.25 0 0 0-.215-.378H1.753Z";
const ltr = false;
const accData = ICON_DOWN;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, accData, collection, packageName });

export default "SAP-icons-v5/down";
export { pathData, ltr, viewBox, accData };