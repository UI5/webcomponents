import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "quarter";
const pathData = "M16 32h64V0h32v32h32V0h32v32h160V0h32v32h32V0h32v32h64v480H16V32zm32 128v320h416V160H48zm192 288h-64V192h64v256zm128-256h64v256h-64V192zm-32 256h-64V192h64v256zM80 192h64v256H80V192zm320-96h33V63h-33v33zm-32-33h-32v33h32V63zM144 96h32V64h-32v32zm-64 0h32V64H80v32z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/quarter";
export { pathData, ltr, accData };