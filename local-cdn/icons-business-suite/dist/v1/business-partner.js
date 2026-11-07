import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "business-partner";
const pathData = "M288 512v-32h192v-32c0-53-43-96-96-96h-32c-25 0-47 8-64 25v-39c19-12 41-18 64-18h16c-44 0-80-36-80-80s36-80 80-80c45 0 80 36 80 80s-35 80-80 80h16c71 0 128 57 128 128v64H288zM0 512v-64c0-71 57-128 128-128h16c-45 0-80-36-80-80s35-80 80-80c44 0 80 36 80 80s-36 80-80 80h16c24 0 45 6 64 18v39c-17-17-39-25-64-25h-32c-53 0-96 43-96 96v32h192v32H0zm368-224c27 0 48-21 48-48s-21-48-48-48-48 21-48 48 21 48 48 48zM96 240c0 27 21 48 48 48s48-21 48-48-21-48-48-48-48 21-48 48z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/business-partner";
export { pathData, ltr, accData };