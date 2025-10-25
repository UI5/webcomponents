import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "task-done";
const pathData = "M240 128q27 0 50 10t40.5 27.5T358 206t10 50q0 26-10 49.5t-27.5 41T290 374t-50 10-50-10-40.5-27.5-27.5-41-10-49.5q0-27 10-50t27.5-40.5T190 138t50-10z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/task-done";
export { pathData, ltr, accData };