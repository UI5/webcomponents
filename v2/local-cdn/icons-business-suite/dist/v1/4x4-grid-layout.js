import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "4x4-grid-layout";
const pathData = "M0 512V0h512v512H0zm272-360v88h88v-88h-88zm120 328h88v-88h-88v88zM272 272v88h88v-88h-88zm0 120v88h88v-88h-88zm120-152h88v-88h-88v88zm0 32v88h88v-88h-88zm88-240h-88v88h88V32zM32 392v88h88v-88H32zm120 0v88h88v-88h-88zM32 32v88h88V32H32zm0 240v88h88v-88H32zm120 0v88h88v-88h-88zM32 152v88h88v-88H32zM272 32v88h88V32h-88zM152 152v88h88v-88h-88zm0-32h88V32h-88v88z";
const ltr = false;
const accData = null;
const collection = "business-suite-v1";
const packageName = "@ui5/webcomponents-icons-business-suite";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "business-suite-v1/4x4-grid-layout";
export { pathData, ltr, accData };