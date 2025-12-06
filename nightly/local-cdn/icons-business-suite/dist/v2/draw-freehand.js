import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "draw-freehand";
const pathData = "M99 357L367 87c9-9 27-9 36 0 11 11 11 26 0 37L135 393c-5 5-11 7-19 7-20 0-33-27-17-43zM458 0c23 0 38 15 38 38 0 21-15 39-38 39-21 0-39-18-39-39 0-23 18-38 39-38zM54 404c21 0 38 17 38 38 0 23-17 38-38 38-23 0-38-15-38-38 0-21 15-38 38-38z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/draw-freehand";
export { pathData, ltr, accData };