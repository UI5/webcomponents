import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "text-color";
const pathData = "M3.375 11 7 1h2l3.594 10h-1.531L10 8H6l-1.031 3H3.375ZM2.5 13h11c.146 0 .266.052.36.156.093.104.14.219.14.344v1c0 .333-.167.5-.5.5h-11a.503.503 0 0 1-.344-.14A.462.462 0 0 1 2 14.5v-1c0-.125.052-.24.156-.344A.478.478 0 0 1 2.5 13Zm7.188-6L8 2 6.281 7h3.407Z";
const ltr = true;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v4/text-color";
export { pathData, ltr, viewBox, accData };