import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_GENERATE_SHORTCUT } from "../generated/i18n/i18n-defaults.js";

const name = "generate-shortcut";
const pathData = "M12.25 1A2.75 2.75 0 0 1 15 3.75v8.5A2.75 2.75 0 0 1 12.25 15h-.5a.75.75 0 0 1 0-1.5h.5c.69 0 1.25-.56 1.25-1.25V6.5h-11v5.75c0 .69.56 1.25 1.25 1.25h.5a.75.75 0 0 1 0 1.5h-.5A2.75 2.75 0 0 1 1 12.25v-8.5A2.75 2.75 0 0 1 3.75 1h8.5ZM8.558 8.248l2.25 2.5a.75.75 0 0 1-1.116 1.004l-.942-1.048v3.546a.75.75 0 0 1-1.5 0v-3.546l-.942 1.048a.75.75 0 0 1-1.116-1.004l2.25-2.5a.758.758 0 0 1 1.116 0ZM3.75 2.5c-.69 0-1.25.56-1.25 1.25V5h11V3.75c0-.69-.56-1.25-1.25-1.25h-8.5Z";
const ltr = false;
const accData = ICON_GENERATE_SHORTCUT;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, accData, collection, packageName });

export default "SAP-icons-v5/generate-shortcut";
export { pathData, ltr, viewBox, accData };