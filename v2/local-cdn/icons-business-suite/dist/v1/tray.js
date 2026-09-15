import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "tray";
const pathData = "M0 290c0-8 3-16 10-23l47-167c4-19 21-34 41-34h315c20 0 37 15 41 34l47 166c7 7 11 14 11 24v128c0 19-13 32-32 32H32c-19 0-32-13-32-32V290zm46-32h82c0 22 11 32 32 32h193c21 0 31-10 31-32h81l-43-151v-1c-1-5-4-8-9-8H98c-5 0-8 3-9 8v1zm3 64c-6 0-12-1-17-4v100h448V318c-5 3-11 4-18 4H49z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/tray";
export { pathData, ltr, accData };