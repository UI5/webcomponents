import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "fridge";
const pathData = "M4.125 0h7.75c.313 0 .578.115.797.344.219.229.328.5.328.812V15h-1v1h-2v-1H6.031v1H4v-1H3V1.156c0-.312.11-.583.328-.812A1.06 1.06 0 0 1 4.125 0ZM12 14V1.562a.523.523 0 0 0-.172-.406.565.565 0 0 0-.39-.156H4.561a.565.565 0 0 0-.39.156.524.524 0 0 0-.172.407V14h8ZM10.031 3v1H6V3h4.031ZM8.687 6.438h2.282V7H8.688v-.563Z";
const ltr = false;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v4/fridge";
export { pathData, ltr, viewBox, accData };