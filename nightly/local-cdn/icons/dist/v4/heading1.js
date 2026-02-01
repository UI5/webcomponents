import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "heading1";
const pathData = "M0 400V80q0-16 16-16h8q16 0 16 16v144h176V80q0-16 16-16h8q16 0 16 16v320q0 16-16 16h-8q-16 0-16-16V256H40v144q0 16-16 16h-8q-16 0-16-16zm352-133l64-43h32v224h64v32H352v-32h56V266l-56 38v-37z";
const ltr = true;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/heading1";
export { pathData, ltr, accData };