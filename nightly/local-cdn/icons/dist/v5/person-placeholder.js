import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "person-placeholder";
const pathData = "M8 1a4 4 0 0 1 2.616 7.023C12.61 8.931 14 10.927 14 13.25v1a.75.75 0 0 1-.75.75H2.75a.75.75 0 0 1-.75-.75v-1c0-2.323 1.39-4.319 3.383-5.227A4 4 0 0 1 8 1Zm-.001 8C5.372 9 3.5 10.911 3.5 13.25v.25h9v-.25C12.5 10.911 10.686 9 7.999 9ZM8 2.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z";
const ltr = false;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v5/person-placeholder";
export { pathData, ltr, viewBox, accData };