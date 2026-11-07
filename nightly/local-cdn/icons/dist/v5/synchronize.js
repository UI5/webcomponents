import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_SYNCHRONIZE } from "../generated/i18n/i18n-defaults.js";

const name = "synchronize";
const pathData = "M4.25 10a.75.75 0 0 1 0 1.5H2.118c1.409 1.823 3.647 3 5.882 3 2.754 0 5.345-1.543 6.575-4.077a.75.75 0 0 1 1.35.654C14.435 14.147 11.305 16 8 16c-2.435 0-4.821-1.127-6.5-2.917v1.167a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 .75 10h3.5ZM8 0a8.864 8.864 0 0 1 6.5 2.834V1.75a.75.75 0 0 1 1.5 0v3.5a.75.75 0 0 1-.75.75h-3.5a.75.75 0 0 1 0-1.5h2.179c-1.37-1.887-3.59-3-5.929-3-2.657 0-5.318 1.663-6.585 4.097a.75.75 0 0 1-1.33-.694C1.598 2 4.757 0 8 0Z";
const ltr = false;
const accData = ICON_SYNCHRONIZE;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, accData, collection, packageName });

export default "SAP-icons-v5/synchronize";
export { pathData, ltr, viewBox, accData };