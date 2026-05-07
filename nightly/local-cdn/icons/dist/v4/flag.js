import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_FLAG } from "../generated/i18n/i18n-defaults.js";

const name = "flag";
const pathData = "M2 0h1v16H2V0Zm9.594 1.031c.291 0 .536-.02.734-.062A2 2 0 0 0 12.86.78a4.77 4.77 0 0 0 .5-.312c.177-.124.39-.28.64-.468v7.469a6.664 6.664 0 0 1-.938.781c-.291.188-.614.36-.968.516A2.683 2.683 0 0 1 11 9c-.104 0-.349-.052-.734-.156-.386-.104-.802-.219-1.25-.344-.448-.125-.865-.24-1.25-.344C7.38 8.052 7.125 8 7 8c-.604 0-1.135.078-1.594.234C4.948 8.391 4.48 8.646 4 9V1.969c.208-.354.48-.677.813-.969.291-.25.64-.48 1.046-.687C6.266.104 6.76 0 7.344 0c.146 0 .427.052.843.156.417.104.86.224 1.329.36.468.135.9.255 1.296.359.396.104.657.156.782.156Z";
const ltr = true;
const accData = ICON_FLAG;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, accData, collection, packageName });

export default "SAP-icons-v4/flag";
export { pathData, ltr, viewBox, accData };