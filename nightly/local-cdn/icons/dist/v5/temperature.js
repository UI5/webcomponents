import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "temperature";
const pathData = "M274 262q22 21 34 48t12 58q0 30-11.5 56t-31 45.5-45.5 31-56 11.5-56-11.5-45.5-31-31-45.5T32 368q0-32 13.5-60.5T82 259V96q0-40 28-68t68-28 68 28 28 68v166zM378 83q-11 0-18.5-7T352 58t7.5-18.5T378 32h76q11 0 18.5 7.5T480 58t-7.5 18-18.5 7h-76zM176 461q19 0 36-7.5t29.5-20 20-29.5 7.5-36q0-22-9-41t-23-30q-14-10-14-23V96q0-19-13-32t-32-13-32 13-13 32v175q0 13-15 24t-25 30.5T83 368q0 19 7.5 36t20 29.5 29.5 20 36 7.5zm25-134q23 15 23 41 0 20-14 34t-34 14-34-14-14-34q0-13 6-23.5t16-16.5V154q0-11 7.5-18.5T176 128t18 7.5 7 18.5v173zm177-148q-11 0-18.5-7t-7.5-18 7.5-18.5T378 128h44q11 0 18.5 7.5T448 154t-7.5 18-18.5 7h-44zm76 45q11 0 18.5 7.5T480 250t-7.5 18-18.5 7h-76q-11 0-18.5-7t-7.5-18 7.5-18.5T378 224h76z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/temperature";
export { pathData, ltr, accData };