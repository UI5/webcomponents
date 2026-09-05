import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_FILTER } from "../generated/i18n/i18n-defaults.js";

const name = "filter";
const pathData = "M14.257 1c.618 0 .972.737.587 1.219l-4.838 6.044v3.887a.75.75 0 0 1-.268.575l-2.501 2.1c-.478.4-1.234.05-1.234-.575V8.264L1.164 2.219C.78 1.737 1.134 1 1.75 1h12.507ZM7.34 7.531A.75.75 0 0 1 7.504 8v4.64l1.001-.84V8a.75.75 0 0 1 .164-.469L12.696 2.5H3.313L7.34 7.531Z";
const ltr = false;
const accData = ICON_FILTER;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, accData, collection, packageName });

export default "SAP-icons-v5/filter";
export { pathData, ltr, viewBox, accData };