import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "year";
const pathData = "M104.5 480c-37 0-65-28-65-65V112c0-36 28-65 65-65h64V19c0-12 10-21 22-21s21 9 21 21v28h87V19c0-12 9-21 21-21s22 9 22 21v28h66c36 0 65 29 65 65v303c0 37-29 65-65 65h-303zm-22-368v45h346v-45c0-12-9-21-21-21h-66v29c0 12-10 22-22 22s-21-10-21-22V91h-87v29c0 12-9 22-21 22s-22-10-22-22V91h-64c-12 0-22 9-22 21zm346 181h-87v50h87v-50zm-217-43h87v-50h-87v50zm0 93h87v-50h-87v50zm130-93h87v-50h-87v50zm-130 187h87v-50h-87v50zm130 0h66c12 0 21-10 21-22v-28h-87v50zm-259-144v50h86v-50h-86zm86-93h-86v50h86v-50zm-86 187v28c0 12 10 22 22 22h64v-50h-86z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/year";
export { pathData, ltr, accData };