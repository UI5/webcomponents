import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "tractor";
const pathData = "M237.875 445c-123 0-222-99-222-222s99-222 222-222 222 99 222 222c0 52-18 100-49 139l77 76c11 11 11 24 0 35-5 5-11 7-18 7s-12-2-17-7l-77-77c-39 31-86 49-138 49zm-173-222c0 96 77 173 173 173s173-77 173-173c0-95-77-172-173-172s-173 77-173 172zm99-27c-4-37 17-66 49-71v-25c0-17 8-25 25-25s25 8 25 25v25h24c17 0 25 8 25 24 0 17-8 25-25 25h-61c-9 0-13 4-13 12 0 9 4 13 13 13h22c25 0 46 11 58 34 19 41-9 78-43 89v24c0 17-8 25-25 25s-25-8-25-25v-24h-24c-17 0-25-8-25-25 0-16 8-24 25-24h61c9 0 13-4 13-13 0-8-4-12-13-12h-23c-30 0-59-21-63-52z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/tractor";
export { pathData, ltr, accData };