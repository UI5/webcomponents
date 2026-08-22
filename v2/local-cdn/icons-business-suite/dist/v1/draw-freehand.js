import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "draw-freehand";
const pathData = "M435 0h72v72h-72V0zm-30 64l33 36-337 347-32-36zM5 440h72v72H5v-72z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/draw-freehand";
export { pathData, ltr, accData };