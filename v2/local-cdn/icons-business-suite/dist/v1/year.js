import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "year";
const pathData = "M16 512V32h64V0h32v32h32V0h32v32h160V0h32v32h32V0h32v32h64v480H16zm32-32h416V160H48v320zm224-127v-64h64v64h-64zm95-64h64v64h-64v-64zm-223 64H80v-64h64v64zm287 95h-64v-64h64v64zm-159 0v-64h64v64h-64zm159-192h-64v-64h64v64zM80 448v-64h64v64H80zm95 0v-64h64v64h-64zm0-95v-64h64v64h-64zm0-97v-64h64v64h-64zm97 0v-64h64v64h-64zm-192 0v-64h64v64H80zM336 96h32V64h-32v32zm64 0h32V64h-32v32zm-256 0h32V64h-32v32zm-64 0h32V64H80v32z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/year";
export { pathData, ltr, accData };