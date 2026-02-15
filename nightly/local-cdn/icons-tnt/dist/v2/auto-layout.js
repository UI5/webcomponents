import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "auto-layout";
const pathData = "M32 288V32h208v256H32zm240-64h208v256H272V224zM480 32v160H272V32h208zM32 320h208v160H32V320z";
const ltr = false;
const accData = null;
const collection = "tnt-v2";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v2/auto-layout";
export { pathData, ltr, accData };