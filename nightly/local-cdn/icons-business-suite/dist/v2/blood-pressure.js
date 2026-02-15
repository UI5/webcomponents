import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "blood-pressure";
const pathData = "M399 2h48c27 0 48 21 48 48v143c0 27-21 48-48 48v72c0 92-75 167-167 167s-167-75-167-167v-56c-56-15-96-66-96-126C17 59 74 2 147 2c72 0 130 57 130 129 0 68-52 122-117 130v52c0 65 55 119 120 119 66 0 119-54 119-119v-72c-27 0-47-21-47-48V50c0-27 20-48 47-48zM65 131c0 47 35 83 82 83 45 0 82-36 82-83 0-45-37-81-82-81-47 0-82 36-82 81zm58 15l13-55c3-11 18-11 21 0l15 55c4 15-4 32-20 35h-9c-16-3-24-20-20-35z";
const ltr = false;
const accData = null;
const collection = "business-suite-v2";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v2/blood-pressure";
export { pathData, ltr, accData };