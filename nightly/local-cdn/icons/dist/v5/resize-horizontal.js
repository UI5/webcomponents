import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_RESIZE_HORIZONTAL } from "../generated/i18n/i18n-defaults.js";

const name = "resize-horizontal";
const pathData = "M6.25 1a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-1.5 0V1.75A.75.75 0 0 1 6.25 1Zm3.5 0a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-1.5 0V1.75A.75.75 0 0 1 9.75 1ZM2.748 5.442a.75.75 0 0 1 1.004 1.116L1.872 8.25l1.88 1.692a.75.75 0 0 1-1.004 1.116l-2.5-2.25a.75.75 0 0 1 0-1.116l2.5-2.25Zm9.444-.194a.75.75 0 0 1 1.06-.056l2.5 2.25a.75.75 0 0 1 0 1.116l-2.5 2.25a.75.75 0 0 1-1.004-1.116L14.128 8l-1.88-1.692a.75.75 0 0 1-.056-1.06Z";
const ltr = false;
const accData = ICON_RESIZE_HORIZONTAL;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, accData, collection, packageName });

export default "SAP-icons-v5/resize-horizontal";
export { pathData, ltr, viewBox, accData };