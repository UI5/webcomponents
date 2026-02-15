import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "video";
const pathData = "M486 128q11 0 18.5 7.5T512 154v204q0 11-7.5 18.5T486 384q-6 0-11-3l-91-45v22q0 38-26 64t-64 26H90q-38 0-64-26T0 358V154q0-38 26-64t64-26h204q38 0 64 26t26 64v22l91-45q6-3 11-3zm-153 26q0-17-11-28t-28-11H90q-17 0-28 11t-11 28v204q0 17 11 28t28 11h204q17 0 28-11t11-28V154zm128 41l-77 38v45l77 39V195z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/video";
export { pathData, ltr, accData };