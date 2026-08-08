import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "tv";
const pathData = "M0 384V60h512v324H0zM480 92H32v260h448V92zM64 124h384v196H64V124zm22 324h340v32H86v-32zm230-16v-32h60v32h-60zm-180-32h60v32h-60v-32z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/tv";
export { pathData, ltr, accData };