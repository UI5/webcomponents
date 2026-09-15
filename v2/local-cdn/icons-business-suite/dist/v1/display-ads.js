import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "display-ads";
const pathData = "M480 32H32v320h448V32zM105 242c-13 0-22-4-29-13-8-8-12-17-12-28 0-24 17-41 41-41 11 0 21 4 28 11 7 9 11 19 11 30 0 21-17 41-39 41zm-41 46h256v32H64v-32zm112-128h144v32H176v-32zm0 64h144v32H176v-32zm15 160H0V0h512v384H320v96h96v32H96v-32h95v-96zM64 64h384v64H64V64zm288 96h96v160h-96V160z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/display-ads";
export { pathData, ltr, accData };