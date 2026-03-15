import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "sound-off";
const pathData = "M23 0l489 489-23 23L0 23zm201 153l140-82q7-7 20-7 12 0 22 9t10 23v252l-32-32V96l-139 82-23-24q1 0 2-1zM97 185q1-3 2-6.5t4-7.5l25 25v124h64q5 1 9 1t9 1q8 2 16 3.5t15 6.5l55 32 83 83q-4-1-7.5-2t-7.5-4l-140-82q-5-4-16-5.5t-16-1.5h-64q-13 0-19-5t-9-11q-4-7-4-16V192q0-6 1-7z";
const ltr = true;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/sound-off";
export { pathData, ltr, accData };