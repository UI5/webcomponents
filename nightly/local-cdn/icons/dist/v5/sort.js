import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_SORT } from "../generated/i18n/i18n-defaults.js";

const name = "sort";
const pathData = "M4.25 1a.75.75 0 0 1 .75.75v10.69l1.22-1.22a.75.75 0 0 1 1.06 1.06l-2.5 2.5a.772.772 0 0 1-1.06 0l-2.5-2.5a.75.75 0 0 1 1.06-1.06l1.22 1.22V1.75A.75.75 0 0 1 4.25 1Zm8.03.22 2.5 2.5a.75.75 0 0 1-1.06 1.06L12.5 3.56v10.69a.75.75 0 0 1-1.5 0V3.56L9.78 4.78a.75.75 0 0 1-1.06-1.06l2.5-2.5a.772.772 0 0 1 1.06 0Z";
const ltr = false;
const accData = ICON_SORT;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, accData, collection, packageName });

export default "SAP-icons-v5/sort";
export { pathData, ltr, viewBox, accData };