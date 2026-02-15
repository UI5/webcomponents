import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "database-consistency";
const pathData = "M461 51H51v410h410V51zM187 297q-8-8-8-18t8-18l58-58-58-58q-8-8-8-18t8-18 18-8 18 8l76 76q8 8 8 18t-8 18l-58 58 41 42v-15q0-11 7.5-18.5T308 280t18 7.5 7 18.5v80q0 11-7 18t-18 7h-80q-11 0-18.5-7t-7.5-18 7.5-18.5T228 360h21l-60-60q0 1-2-3zM487 0q11 0 18 7.5t7 18.5v461q0 11-7 18t-18 7H26q-11 0-18.5-7T0 487V26Q0 15 7.5 7.5T26 0h461z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/database-consistency";
export { pathData, ltr, accData };