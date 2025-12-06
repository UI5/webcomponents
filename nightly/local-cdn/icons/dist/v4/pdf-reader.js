import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "pdf-reader";
const pathData = "M96 0Q56 0 28 28T0 96h32q0-26 18.5-45T96 32h32V0H96zM0 416q0 40 28 68t68 28h32v-32H96q-27 0-45.5-19T32 416H0zm384 64v32h32q20 0 37-7.5t30.5-20.5 21-30.5T512 416h-32q0 26-19 45t-45 19h-32zm32-448q26 0 45 19t19 45h32q0-20-7.5-37.5t-21-30.5T453 7.5 416 0h-32v32h32zm80 128q16 0 16 16t-16 16h-85v44h60q16 0 16 16t-16 16h-60v60q0 6-4.5 11t-11.5 5-11.5-5-4.5-11V176q0-16 16-16h101zm-363 67q0 27-19.5 46.5T67 293H32v35q0 6-4.5 11T16 344t-11.5-5T0 328V176q0-16 16-16h51q27 0 46.5 19.5T133 227zM32 261h35q14 0 24-10t10-24-10-24.5T67 192H32v69zm221-101q27 0 46.5 19.5T319 227v50q0 28-19.5 47.5T253 344h-51q-7 0-11.5-5t-4.5-11V176q0-16 16-16h51zm34 67q0-14-10-24.5T253 192h-35v120h35q14 0 24-10.5t10-24.5v-50z";
const ltr = true;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/pdf-reader";
export { pathData, ltr, accData };