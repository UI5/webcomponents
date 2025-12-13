import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "bus-public-transport";
const pathData = "M0 384l26-263q2-25 20.5-41T89 64h295q26 0 49.5 10t41 27.5T502 142t10 50v160q0 13-9.5 22.5T480 384h-34q-5 27-27 45.5T368 448t-51-18.5-28-45.5h-67q-5 27-27 45.5T144 448t-51-18.5T65 384H0zm36-32h29q6-28 28-46t51-18 51 18 27 46h67q6-28 28-46t51-18 51 18 27 46h34v-96H47zm220-128h96V96h-96v128zm-32 0V96h-96v128h96zM384 96v128h96v-32q0-40-28-68t-68-28zm-64 272q0 20 14 34t34 14 34-14 14-34-14-34-34-14-34 14-14 34zm-224 0q0 20 14 34t34 14 34-14 14-34-14-34-34-14-34 14-14 34zm0-144V96h-7q-12 0-21 9.5T58 128l-8 96h46z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/bus-public-transport";
export { pathData, ltr, accData };