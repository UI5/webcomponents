import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "comparison-chart";
const pathData = "M64 128c-17 0-32-13-32-32 0-17 15-32 32-32h103V32h50v32h231c19 0 32 15 32 32 0 19-13 32-32 32H217v30h-50v-30H64zM32 257c0-19 15-32 32-32h259v-35h50v35h75c19 0 32 13 32 32 0 17-13 32-32 32h-75v27h-50v-27H64c-17 0-32-15-32-32zm32 191c-17 0-32-13-32-32 0-17 15-32 32-32h163v-29h50v29h171c19 0 32 15 32 32 0 19-13 32-32 32H277v33h-50v-33H64z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/comparison-chart";
export { pathData, ltr, accData };