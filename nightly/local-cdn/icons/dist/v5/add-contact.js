import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_ADD_CONTACT } from "../generated/i18n/i18n-defaults.js";

const name = "add-contact";
const pathData = "M6.246 2a.75.75 0 0 1 0 1.5H2.75c-.69 0-1.25.56-1.25 1.25v8.5c0 .69.56 1.25 1.25 1.25h8.5c.69 0 1.25-.56 1.25-1.25V9.745a.75.75 0 0 1 1.5 0v3.505A2.75 2.75 0 0 1 11.25 16h-8.5A2.75 2.75 0 0 1 0 13.25v-8.5A2.75 2.75 0 0 1 2.75 2h3.496ZM7 10a2.5 2.5 0 0 1 2.5 2.5.5.5 0 0 1-.5.5H5a.515.515 0 0 1-.5-.5A2.5 2.5 0 0 1 7 10Zm0-4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm5.5-6a.75.75 0 0 1 .75.75v2h2a.75.75 0 0 1 0 1.5h-2v2a.75.75 0 0 1-1.5 0v-2h-2a.75.75 0 0 1 0-1.5h2v-2A.75.75 0 0 1 12.5 0Z";
const ltr = false;
const accData = ICON_ADD_CONTACT;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, accData, collection, packageName });

export default "SAP-icons-v5/add-contact";
export { pathData, ltr, viewBox, accData };