import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "pipette";
const pathData = "M121.719 336l39 39 181-182-38-38zm294-327l72 72c11 11 10 22-3 33l-79 79 31 31c11 9 11 24 0 33-9 11-23 11-32 0l-32-31-198 199c0 3-2 5-5 5h-3c-3 3-3 2-6 2h-74c1 3 1 7 1 12 0 20-15 36-35 36s-36-16-36-36 16-35 36-35c5 0 9 0 12 1v-74c0-7 3-13 10-18l196-196-31-31c-11-11-11-23 0-34 9-9 24-9 33 0l31 31 79-79c11-11 22-11 33 0z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/pipette";
export { pathData, ltr, accData };