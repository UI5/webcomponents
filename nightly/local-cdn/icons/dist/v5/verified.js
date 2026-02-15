import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "verified";
const pathData = "M221 17q14-17 35-17t35 17l22 27 33-13q8-3 16-3 16 0 28.5 10.5T406 66l6 35 34 5q17 3 27.5 15.5T484 150q0 8-3 16l-13 33 28 22q16 13 16 35t-16 35l-28 22 13 33q3 7 3 16 0 16-10.5 28.5T446 406l-34 6-6 34q-3 17-15.5 27.5T362 484q-8 0-16-3l-33-13-22 28q-13 16-35 16t-35-16l-22-28-33 13q-7 3-16 3-16 0-28.5-10.5T106 446l-5-34-35-6q-17-3-27.5-15.5T28 362q0-9 3-16l13-33-28-22Q0 277 0 256t16-35l28-22-13-33q-3-8-3-16 0-16 10.5-28.5T66 106l35-5 5-35q3-17 15.5-27.5T150 28q9 0 16 3l33 13zm11 335q13 0 23-10l120-128q9-9 9-22t-9.5-22.5T352 160q-14 0-23 10l-98 104-48-49q-9-9-23-9-13 0-22.5 9t-9.5 23q0 13 9 22l72 73q9 9 23 9z";
const ltr = true;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/verified";
export { pathData, ltr, accData };