import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "quarter";
const pathData = "M496 512H16V32h64V0h32v32h32V0h32v32h160V0h32v32h32V0h32v32h64v480zM433 96V63h-33v33h33zm-97 0h32V63h-32v33zM176 64h-32v32h32V64zM80 96h32V64H80v32zm-32 64v320h416V160H48zm192 288h-64V192h64v256zm192 0h-64V192h64v256zm-96 0h-64V192h64v256zm-256 0V192h64v256H80z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/quarter";
export { pathData, ltr, accData };