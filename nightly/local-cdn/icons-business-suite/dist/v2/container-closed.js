import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "container-closed";
const pathData = "M17 408V74C17 34 49 2 89 2h334c40 0 72 32 72 72v334c0 40-32 72-72 72H89c-40 0-72-32-72-72zM89 50c-13 0-24 11-24 24v334c0 13 11 24 24 24h143V50H89zm191 167h71c13 0 24 11 24 24v43c0 13-11 24-24 24-15 0-23-11-23-24v-19h-48v167h143c13 0 24-11 24-24V74c0-13-11-24-24-24H280v167z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/container-closed";
export { pathData, ltr, accData };