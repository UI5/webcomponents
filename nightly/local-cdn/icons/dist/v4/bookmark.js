import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "bookmark";
const pathData = "M7.969 9.12 5.78 11.083v-8.78h4.438v8.779L7.969 9.12ZM12.5 0v16l-4.531-3.86L3.5 16V0h9Zm-1.156 1.152H4.656V13.54l3.313-2.895 3.375 2.895V1.15Z";
const ltr = false;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v4/bookmark";
export { pathData, ltr, viewBox, accData };