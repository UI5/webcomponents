import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "add-note";
const pathData = "M1 512V32h64V0h32v32h96V0h32v32h96V0h32v32h64v207h-32V128H33v352h221v32H1zm374-91h-89v-45h89v-89h45v89h91v45h-91v91h-45v-91zm-54-101H97v-32h224v32zM97 192h224v32H97v-32zm0 192h157v32H97v-32zM353 64h-32v32h32V64zM193 96h32V64h-32v32zM65 96h32V64H65v32z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/add-note";
export { pathData, ltr, accData };