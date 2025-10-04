import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "text-align-right";
const pathData = "M80 64h368v32H80q-16 0-16-16t16-16zm0 192h368v32H80q-16 0-16-16t16-16zM64 464q0-16 16-16h368v32H80q-16 0-16-16zm192-96q0-16 16-16h176v32H272q-16 0-16-16zm16-208h176v32H272q-16 0-16-16t16-16z";
const ltr = true;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/text-align-right";
export { pathData, ltr, accData };