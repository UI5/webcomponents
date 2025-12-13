import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "container";
const pathData = "M0 80h512v368H0V80zm32 32v304h448V112H32zm320 272h-32V144h32v240zm48-240h32v240h-32V144zM272 384h-32V144h32v240zM160 144h32v240h-32V144zm-80 0h32v240H80V144z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/container";
export { pathData, ltr, accData };