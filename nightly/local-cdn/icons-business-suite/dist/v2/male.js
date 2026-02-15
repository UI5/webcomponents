import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "male";
const pathData = "M481.5 45v104c0 15-10 26-25 26s-26-11-26-26v-41l-122 121c22 28 33 60 33 96 0 86-71 155-156 155-86 0-155-69-155-155 0-43 17-81 46-110 52-52 135-61 194-21l123-123h-41c-15 0-26-11-26-26s11-26 26-26h104c15 0 25 11 25 26zm-399 280c0 29 10 53 30 73 40 40 107 40 147 0 20-20 30-44 30-73 0-57-47-104-104-104s-103 47-103 104z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/male";
export { pathData, ltr, accData };