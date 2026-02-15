import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "railcar";
const pathData = "M16 208V48c0-19 13-32 32-32h416c17 0 32 13 32 32v160h-48v48c0 17-15 32-32 32H96c-19 0-32-15-32-32v-48H16zm32-32h48v80h320v-80h48V48H48v128zM32 416c-19 0-32-13-32-32h48c8-36 40-64 79-64s71 28 78 64h86c8-36 40-64 79-64s71 28 78 64h64v64h-32v-32h-32c-7 37-39 64-78 64s-71-27-79-64h-86c-7 37-39 64-78 64s-71-27-79-64H32zm290-16c0 26 22 48 48 48s48-22 48-48-22-48-48-48-48 22-48 48zm-243 0c0 26 22 48 48 48s48-22 48-48-22-48-48-48-48 22-48 48z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/railcar";
export { pathData, ltr, accData };