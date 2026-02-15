import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "door";
const pathData = "M359 404V152c0-15-11-26-26-26H180c-13 0-25 11-25 26v252c0 13 12 25 25 25h153c15 0 26-12 26-25zM180 75h153c43 0 75 34 75 77v252c0 41-32 76-75 76H180c-41 0-76-35-76-76V152c0-43 35-77 76-77zm152-24H180c-13 0-25-11-25-26 0-13 12-25 25-25h152c13 0 25 12 25 25 0 15-12 26-25 26zm-51 227c13 0 25 12 25 25s-12 25-25 25-24-12-24-25 11-25 24-25z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/door";
export { pathData, ltr, accData };