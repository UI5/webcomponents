import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "strikethrough";
const pathData = "M64 64V32h384v32H288v160h-64V64H64zM32 272q0-16 16-16h416q16 0 16 16t-16 16H48q-16 0-16-16zm192 48h64v160h-64V320z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/strikethrough";
export { pathData, ltr, accData };