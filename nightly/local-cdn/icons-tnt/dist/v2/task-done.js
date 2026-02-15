import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "task-done";
const pathData = "M272 160q40 0 68 28t28 68-28 68-68 28-68-28-28-68 28-68 68-28z";
const ltr = false;
const accData = null;
const collection = "tnt-v2";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v2/task-done";
export { pathData, ltr, accData };