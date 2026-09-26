import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "email-read";
const pathData = "M16 4.469V15c0 .27-.099.505-.297.703A.961.961 0 0 1 15 16H1a.947.947 0 0 1-.719-.297A.988.988 0 0 1 0 15V4.469L7.938 0 16 4.469ZM14.5 15 8 10.187 1.5 15h13Zm-4.25-5.813L15 4.97 7.969 1.156 1 4.97l4.719 4.218-.532.563L1 5.969V14.5l6.969-5.313L15 14.438V6l-4.156 3.75-.594-.563Z";
const ltr = false;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v4/email-read";
export { pathData, ltr, viewBox, accData };