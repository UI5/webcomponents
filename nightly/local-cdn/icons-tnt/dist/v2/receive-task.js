import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "receive-task";
const pathData = "M480 144L256 324 32 144v280l131-131 24 24L56 448h401L326 317l23-24 131 131V144zM66 128l190 154 190-154H66zm414-32q14 0 23 9t9 23v320q0 13-9 22.5t-23 9.5H32q-13 0-22.5-9.5T0 448V128q0-14 9.5-23T32 96h448z";
const ltr = false;
const accData = null;
const collection = "tnt-v2";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v2/receive-task";
export { pathData, ltr, accData };