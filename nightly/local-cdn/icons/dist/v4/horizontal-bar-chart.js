import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "horizontal-bar-chart";
const pathData = "M96 360q0-8 8-8h368q8 0 8 8v48q0 8-8 8H104q-8 0-8-8v-48zm0-128q0-8 8-8h240q8 0 8 8v48q0 8-8 8H104q-8 0-8-8v-48zM64 32v448H32V32h32zm32 72q0-8 8-8h176q8 0 8 8v48q0 8-8 8H104q-8 0-8-8v-48z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/horizontal-bar-chart";
export { pathData, ltr, accData };