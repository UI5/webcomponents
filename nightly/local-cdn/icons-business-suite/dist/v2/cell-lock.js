import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "cell-lock";
const pathData = "M383.5 128v76c44 0 77 33 77 77v153c0 23-7 41-22 55-14 15-32 23-55 23h-255c-23 0-41-8-55-23-15-14-22-32-22-55V281c0-44 33-77 77-77v-76c0-51 29-99 77-118 14-7 31-10 50-10 33 0 68 12 91 37 12 11 21 25 27 40 7 15 10 32 10 51zm-204 0v76h153v-76c0-45-32-77-77-77-44 0-76 33-76 77zm230 306V281c0-16-11-25-26-25h-255c-17 0-26 8-26 25v153c0 17 9 26 26 26h255c8 0 14-2 19-7 5-4 7-10 7-19z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/cell-lock";
export { pathData, ltr, accData };