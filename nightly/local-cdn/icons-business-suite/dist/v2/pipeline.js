import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "pipeline";
const pathData = "M0 300c0-29 23-50 52-50h25c28 0 51 21 51 50h52v-77c0-15 10-25 25-25h25v-26h-25c-15 0-25-11-25-26 0-13 10-25 25-25h25V95c0-15 12-25 27-25s25 10 25 25v26h25c15 0 27 12 27 25 0 15-12 27-27 27h-25v25h25c15 0 27 10 27 25v77h51c0-29 22-50 51-50h26c29 0 50 21 50 50v128c0 29-21 52-50 52h-26c-19 0-35-10-44-25H122c-11 15-26 25-45 25H52c-29 0-52-23-52-52V300zm128 103h257v-51h-77c-13 0-26-11-26-26v-76h-52v76c0 15-10 26-25 26h-77v51zm308-103v128h26V300h-26zm-384 0v128h25V300H52z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/pipeline";
export { pathData, ltr, accData };