import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "map-fill";
const pathData = "M8 0c3.68 0 6.5 2.987 6.5 6.625 0 2.76-1.594 5.093-3.077 6.68a18.304 18.304 0 0 1-2.063 1.883s-.781.56-.997.699a.692.692 0 0 1-.683.039c-.23-.104-1.04-.738-1.04-.738a18.391 18.391 0 0 1-2.063-1.883C3.141 11.768 1.5 9.38 1.5 6.625 1.5 2.987 4.32 0 8 0Zm0 3.75a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z";
const ltr = false;
const accData = null;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, collection, packageName });

export default "SAP-icons-v5/map-fill";
export { pathData, ltr, viewBox, accData };