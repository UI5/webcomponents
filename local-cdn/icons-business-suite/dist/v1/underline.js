import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "underline";
const pathData = "M448 448c19 0 32 13 32 32s-13 32-32 32H65c-19 0-32-13-32-32s13-32 32-32h383zm-192-64c-89 0-159-70-159-159V64c0-19 12-32 32-32 19 0 32 13 32 32v161c0 54 41 96 95 96 55 0 96-42 96-96V64c0-19 13-32 32-32s32 13 32 32v161c0 89-70 159-160 159z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/underline";
export { pathData, ltr, accData };