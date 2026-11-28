import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "add-point";
const pathData = "M204 17c96 0 175 80 175 176s-79 175-175 175c-97 0-175-79-175-175S107 17 204 17zm198 420h-73v-36h73v-73h36v73h74v36h-74v73h-36v-73z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/add-point";
export { pathData, ltr, accData };