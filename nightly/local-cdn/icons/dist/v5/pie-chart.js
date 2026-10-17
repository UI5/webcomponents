import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "pie-chart";
const pathData = "M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0Zm.5 8.624v5.854a6.498 6.498 0 0 0 5.863-7.81L8.5 8.625ZM7 1.576a6.502 6.502 0 0 0 0 12.847V1.576Zm1.5 5.466 5.388-1.796A6.5 6.5 0 0 0 8.5 1.521v5.521Z";
const ltr = false;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v5/pie-chart";
export { pathData, ltr, viewBox, accData };