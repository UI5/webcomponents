import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "legal-section";
const pathData = "M89 480c-40 0-72-32-72-72V74C17 34 49 2 89 2h334c40 0 72 32 72 72v334c0 40-32 72-72 72H89zM65 74v334c0 13 11 24 24 24h334c13 0 24-11 24-24V74c0-13-11-24-24-24H89c-13 0-24 11-24 24zm95 191h192c27 0 47 21 47 48v24c0 27-20 48-47 48H160c-27 0-47-21-47-48v-24c0-27 20-48 47-48zm0-167h192c27 0 47 20 47 47v24c0 27-20 48-47 48H160c-27 0-47-21-47-48v-24c0-27 20-47 47-47zm192 239v-24H160v24h192zM160 145v24h192v-24H160z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/legal-section";
export { pathData, ltr, accData };