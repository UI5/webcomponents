import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "due-date";
const pathData = "M511.5 512H.5V32h97V0h30v32h33V0h31v32h130V0h31v32h33V0h31v32h95v480zm-159-448h-32v32h32V64zm-192 32h32V64h-32v32zm-32-32h-32v32h32V64zm288 0h-32v32h32V64zm-384 416h448V160h-448v320zm240-251v-37h64v37h-64zm-208 0v-37h64v37h-64zm384 0h-64v-37h64v37zm-384 129v-76h128v-64l123 102-123 102v-64h-128zm286-3v-90h98v90h-98zm21-71v49h57v-49h-57zm13 164v-37h64v37h-64zm-48 0h-64v-36h64v36zm-208 0h-64v-36h64v36z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/due-date";
export { pathData, ltr, accData };