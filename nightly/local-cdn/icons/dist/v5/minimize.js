import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "minimize";
const pathData = "M12.25 1A2.75 2.75 0 0 1 15 3.75v8.5A2.75 2.75 0 0 1 12.25 15h-8.5A2.75 2.75 0 0 1 1 12.25v-8.5A2.75 2.75 0 0 1 3.75 1h8.5Zm-8.5 1.5c-.69 0-1.25.56-1.25 1.25v8.5c0 .69.56 1.25 1.25 1.25h8.5c.69 0 1.25-.56 1.25-1.25v-8.5c0-.69-.56-1.25-1.25-1.25h-8.5Zm6.498 7a.75.75 0 1 1 0 1.5H5.75a.75.75 0 0 1 0-1.5h4.498Z";
const ltr = false;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v5/minimize";
export { pathData, ltr, viewBox, accData };