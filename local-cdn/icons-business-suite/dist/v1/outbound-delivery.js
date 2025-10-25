import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "outbound-delivery";
const pathData = "M0 128V80h152l-24-24V8l96 96-96 96v-48l24-24H0zm0 128h288V96h51c56 0 116 46 127 107l8 53h6c17 0 32 13 32 32v96c0 19-15 32-32 32h-34c-7 37-39 64-78 64s-71-27-79-64h-67c-7 37-39 64-78 64s-71-27-79-64H32c-19 0-32-13-32-32v-96c0-5 2-11 5-16-3-5-5-11-5-16zm339-128h-19v128h122l-8-48c-8-47-48-80-95-80zM32 288v96h33c8-36 40-64 79-64s71 28 78 64h67c8-36 40-64 79-64s71 28 78 64h34v-96H32zm291 128c7 19 24 32 45 32s38-13 45-32c2-5 3-11 3-16 0-6-1-11-3-16-7-19-24-32-45-32s-38 13-45 32c-2 5-3 10-3 16 0 5 1 11 3 16zM99 384c-2 5-3 10-3 16 0 5 1 11 3 16 7 19 24 32 45 32s38-13 45-32c2-5 3-11 3-16 0-6-1-11-3-16-7-19-24-32-45-32s-38 13-45 32z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/outbound-delivery";
export { pathData, ltr, accData };