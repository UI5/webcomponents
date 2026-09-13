import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "display-ads";
const pathData = "M0 384V0h512v384H320v96h96v32H96v-32h95v-96H0zM32 32v320h448V32H32zm416 32v64H64V64h384zM105 242c-13 0-22-4-29-13-8-8-12-17-12-28 0-24 17-41 41-41 11 0 21 4 28 11 7 9 11 19 11 30 0 10-4 19-11 28s-16 13-28 13zm215-82v32H176v-32h144zm128 0v160h-96V160h96zm-128 64v32H176v-32h144zm0 64v32H64v-32h256z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/display-ads";
export { pathData, ltr, accData };