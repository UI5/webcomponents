import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "legal-section";
const pathData = "M0 32C0 13 13 0 32 0h448c17 0 32 13 32 32v416c0 17-15 32-32 32H32c-19 0-32-15-32-32V32zm32 416h448V32H32v416zm50-290V58h352v100H82zm0 262V320h352v100H82zm352-230v100H82V190h352zM402 90H114v36h288V90zm0 262H114v36h288v-36zm0-130H114v36h288v-36z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/legal-section";
export { pathData, ltr, accData };