import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "hint";
const pathData = "M192 449h33V225h-32v-34h95v258h32v31H192v-31zm15-369q0-20 14-34t34-14 34 14 14 34-14 34-34 14-34-14-14-34z";
const ltr = true;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/hint";
export { pathData, ltr, accData };