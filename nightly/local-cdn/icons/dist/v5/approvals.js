import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "approvals";
const pathData = "M12.251 0c.966 0 1.75.784 1.75 1.75v12.5a1.75 1.75 0 0 1-1.75 1.75h-8.5a1.75 1.75 0 0 1-1.75-1.75V1.75c0-.966.783-1.75 1.75-1.75h8.5Zm-8.5 1.5a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h8.5a.25.25 0 0 0 .25-.25V1.75a.25.25 0 0 0-.25-.25h-8.5Zm6.505 10a.75.75 0 0 1 0 1.5h-4.51a.75.75 0 0 1 0-1.5h4.51Zm0-3a.75.75 0 0 1 0 1.5h-4.51a.75.75 0 1 1 0-1.5h4.51ZM9.68 2.262a.75.75 0 0 1 1.138.976l-3 3.5a.75.75 0 0 1-1.1.042l-1.5-1.5A.75.75 0 1 1 6.28 4.22l.927.926 2.474-2.884Z";
const ltr = true;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v5/approvals";
export { pathData, ltr, viewBox, accData };