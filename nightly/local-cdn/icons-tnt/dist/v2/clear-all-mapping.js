import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "clear-all-mapping";
const pathData = "M32 96q-13 0-22.5-9.5T0 64q0-14 9-23t23-9h448q14 0 23 9t9 23-9 23-23 9H32zm0 160q-13 0-22.5-9.5T0 224q0-14 9-23t23-9h448q14 0 23 9t9 23-9 23-23 9H32zM0 384q0-14 9-23t23-9h224v64H32q-13 0-22.5-9.5T0 384zm447 31l65 65-32 32-63-65-65 65-32-32 65-65-65-63 32-32 65 64 63-64 32 32z";
const ltr = false;
const accData = null;
const collection = "tnt-v2";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v2/clear-all-mapping";
export { pathData, ltr, accData };