import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "detail-less";
const pathData = "M2 2c-.25 0-.48-.094-.688-.281A.924.924 0 0 1 1 1c0-.292.104-.531.313-.719C1.52.094 1.75 0 2 0h11.969c.25 0 .484.094.703.281A.905.905 0 0 1 15 1c0 .292-.11.531-.328.719a1.063 1.063 0 0 1-.703.281H2Zm12.5 2c.125 0 .24.047.344.14A.462.462 0 0 1 15 4.5a.462.462 0 0 1-.156.36.503.503 0 0 1-.344.14h-5c-.333 0-.5-.167-.5-.5 0-.333.167-.5.5-.5h5Z";
const ltr = false;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v4/detail-less";
export { pathData, ltr, viewBox, accData };