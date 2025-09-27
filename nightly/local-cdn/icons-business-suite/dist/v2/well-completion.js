import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "well-completion";
const pathData = "M55.5 304h49v104c0 12 11 21 23 21h257c12 0 22-9 22-21v-4h50v4c0 40-32 72-72 72h-257c-40 0-72-32-72-72V304zm250-276c0-15 11-26 26-26 13 0 25 11 25 26v276c0 13 11 25 26 25h100c13 0 25 11 25 26 0 13-12 25-25 25h-100c-43 0-77-35-77-76V28zm-276 251c-13 0-25-11-25-26 0-13 12-24 25-24h100c15 0 26-12 26-25V28c0-15 12-26 25-26s25 11 25 26v176c0 41-33 75-76 75h-100zm351-177V53h4c40 0 72 32 72 72v179h-50V125c0-12-10-23-22-23h-4zm-325 101v-78c0-40 32-72 72-72h2v49h-2c-12 0-23 11-23 23v78h-49zm174-150h51v49h-51V53z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/well-completion";
export { pathData, ltr, accData };