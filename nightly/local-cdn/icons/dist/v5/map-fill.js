import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "map-fill";
const pathData = "M256 0q44 0 82 16t66 44 44 65.5 16 79.5q0 44-17 88t-44.5 83.5T341 449t-68 57q-5 4-9 5t-8 1-8-1-9-5q-34-24-68-57t-61.5-72.5T65 293t-17-88q0-42 16-79.5T108 60t66-44 82-16zm0 118q-40 0-66.5 26.5T163 211t26.5 66.5T256 304t66.5-26.5T349 211t-26.5-66.5T256 118z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/map-fill";
export { pathData, ltr, accData };