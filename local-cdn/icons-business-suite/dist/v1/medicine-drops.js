import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "medicine-drops";
const pathData = "M108 474V305c0-37 24-68 59-77v-5h-1c-20 0-37-17-37-36v-12c0-19 17-36 37-36h44V42c0-24 21-44 46-44s46 20 46 44v97h45c20 0 36 17 36 36v12c0 19-16 36-36 36h-2v5c35 9 59 40 59 77v169c0 20-17 36-38 36H146c-21 0-38-16-38-36zM242 42v97h28V42c0-8-5-12-14-12-7 0-14 5-14 12zm-76 149h181c3 0 4-1 4-4v-12c0-3-1-4-4-4H166c-3 0-5 1-5 4v12c0 3 2 4 5 4zm-26 114v169c0 4 5 4 6 4h220c1 0 6 0 6-4V305c0-25-19-45-44-48l-15-1v-33H199v33l-14 1c-25 3-45 23-45 48zm94 87h-44v-45h44v-44h44v44h45v45h-45v44h-44v-44z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/medicine-drops";
export { pathData, ltr, accData };