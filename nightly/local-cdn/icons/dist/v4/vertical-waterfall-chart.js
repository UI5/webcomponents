import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "vertical-waterfall-chart";
const pathData = "M32 4q0-4 4-4h56q4 0 4 4v424q0 4-4 4H36q-4 0-4-4V4zm480 476v32H0v-32h512zM160 4q0-4 4-4h56q4 0 4 4v152q0 4-4 4h-56q-4 0-4-4V4zm256 272q0-4 4-4h56q4 0 4 4v152q0 4-4 4h-56q-4 0-4-4V276zM288 164q0-4 4-4h56q4 0 4 4v104q0 4-4 4h-56q-4 0-4-4V164z";
const ltr = true;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/vertical-waterfall-chart";
export { pathData, ltr, accData };