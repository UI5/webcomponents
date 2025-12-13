import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "tv";
const pathData = "M0 60h512v324H0V60zm480 32H32v260h448V92zm-32 228H64V124h384v196zm-132 80h60v32h-60v-32zm-180 0h60v32h-60v-32zm290 80H86v-32h340v32z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/tv";
export { pathData, ltr, accData };