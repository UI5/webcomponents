import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "draw-rectangle";
const pathData = "M75.5 0v37h145V0h72v37h145V0h74v73h-37v147h37v72h-37v146h37v74h-74v-37h-145v37h-72v-37h-145v37h-74v-74h37V292h-37v-72h37V73h-37V0h74zm362 73h-362v365h362V73z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/draw-rectangle";
export { pathData, ltr, accData };