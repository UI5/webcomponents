import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "underline";
const pathData = "M71 428h370c21 0 31 10 31 31 0 19-12 30-31 30H71c-19 0-31-11-31-30 0-21 10-31 31-31zm186-46c-88 0-156-68-156-155V43c0-19 12-32 31-32s31 13 31 32v184c0 52 41 93 94 93 52 0 92-41 92-93V43c0-19 12-32 31-32s30 13 30 32v184c0 87-68 155-153 155z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/underline";
export { pathData, ltr, accData };