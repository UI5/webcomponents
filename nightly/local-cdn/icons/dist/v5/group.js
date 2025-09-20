import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "group";
const pathData = "M406 255q48 23 77 67.5t29 99.5v32q0 11-7.5 18.5T486 480H154q-11 0-18.5-7.5T128 454v-38H26q-11 0-18.5-7.5T0 390v-76q0-30 17.5-53T61 229q-29-29-29-69t28-68 68-28q24 0 44 10.5t33 28.5q17-32 48-51.5T320 32q26 0 49.5 10.5t41 28T438 111t10 49q0 27-11 52t-31 43zM320 83q-32 0-54.5 22.5T243 160t22.5 54.5T320 237t54.5-22.5T397 160t-22.5-54.5T320 83zm-192 32q-19 0-32 13t-13 32 13 32 32 13 32-13 13-32-13-32-32-13zm101 135q-15-15-24-33-5 8-15 16 21 11 32 28l12-6zm-86 100q6-17 16.5-31.5T182 292q-12-17-32-17H90q-17 0-28 11t-11 28v51h86zm318 72q0-28-10.5-52.5t-29-42.5-43-28.5T326 288h-12q-28 0-52.5 10.5t-43 28.5-29 42.5T179 422v7h282v-7z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/group";
export { pathData, ltr, accData };