import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "container-closed";
const pathData = "M32 64c0-17 13-32 32-32h384c17 0 32 15 32 32v384c0 19-15 32-32 32H64c-19 0-32-13-32-32V64zm208 0H64v384h176V64zm32 0v160h96v80h-32v-48h-64v192h176V64H272z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/container-closed";
export { pathData, ltr, accData };