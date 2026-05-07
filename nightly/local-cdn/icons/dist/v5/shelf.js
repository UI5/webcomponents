import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "shelf";
const pathData = "M14.25 0C15.216 0 16 .784 16 1.75v13.5a.75.75 0 0 1-1.5 0V13.5h-13v1.75a.75.75 0 0 1-1.5 0V1.75C0 .784.784 0 1.75 0h12.5ZM1.5 12h13V7.5h-13V12Zm8.75-3a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5h4.5Zm-8.5-7.5a.25.25 0 0 0-.25.25V6h13V1.75a.25.25 0 0 0-.25-.25H1.75Zm8.5 1.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5h4.5Z";
const ltr = false;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v5/shelf";
export { pathData, ltr, viewBox, accData };