import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "time-change";
const pathData = "M32 32h64c17 0 32 13 32 32v64c0 19-15 32-32 32H32c-19 0-32-13-32-32V64c0-19 13-32 32-32zm211 254h33l-84-85 34-34 84 85 1-34 34-34-1 136H209zm141 162v-64c0-19 13-32 32-32h64c17 0 32 13 32 32v64c0 19-15 32-32 32h-64c-19 0-32-13-32-32zm96-64h-64v64h64v-64z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/time-change";
export { pathData, ltr, accData };