import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "legal-section";
const pathData = "M32 0h448c17 0 32 13 32 32v416c0 17-15 32-32 32H32c-19 0-32-15-32-32V32C0 13 13 0 32 0zm0 32v416h448V32H32zm402 26v100H82V58h352zm-320 68h288V90H114v36zm320 64v100H82V190h352zm-320 68h288v-36H114v36zM82 420V320h352v100H82zm32-68v36h288v-36H114z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/legal-section";
export { pathData, ltr, accData };