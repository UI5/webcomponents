import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "4x4-grid-layout";
const pathData = "M0 512V0h512v512H0zm392-392h88V32h-88v88zm-120 0h88V32h-88v88zM32 32v88h88V32H32zm208 0h-88v88h88V32zm32 120v88h88v-88h-88zm208 0h-88v88h88v-88zm-240 0h-88v88h88v-88zM32 240h88v-88H32v88zm240 32v88h88v-88h-88zm120 88h88v-88h-88v88zm-272-88H32v88h88v-88zm32 0v88h88v-88h-88zm328 120h-88v88h88v-88zm-328 0v88h88v-88h-88zm-32 0H32v88h88v-88zm152 0v88h88v-88h-88z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/4x4-grid-layout";
export { pathData, ltr, accData };