import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "checklist-item";
const pathData = "M75 0h363c33 0 60 27 60 60v268c0 32-17 62-46 78L271 508c-5 3-10 4-15 4s-10-1-15-4L60 406c-28-16-46-46-46-78V60C14 27 42 0 75 0zm42 193c-15 15-15 39 0 53l82 83c8 7 17 11 27 11s19-4 27-11l145-145c15-15 15-39 0-54-7-7-17-11-27-11s-19 4-27 11L226 249l-56-56c-7-8-16-11-26-11s-19 3-27 11z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/checklist-item";
export { pathData, ltr, accData };