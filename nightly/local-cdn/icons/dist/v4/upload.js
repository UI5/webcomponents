import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_UPLOAD } from "../generated/i18n/i18n-defaults.js";

const name = "upload";
const pathData = "M15 13.998c.27 0 .505.1.703.297A.962.962 0 0 1 16 15a.948.948 0 0 1-.297.72A.987.987 0 0 1 15 16H1a.973.973 0 0 1-.719-.281.975.975 0 0 1-.281-.72.99.99 0 0 1 .281-.704.946.946 0 0 1 .719-.297h14Zm-3.063-10.54c.25.228.25.468 0 .719a.494.494 0 0 1-.718 0L8.5 1.455v10.04c0 .334-.167.501-.5.501-.333 0-.5-.167-.5-.5V1.518L4.844 4.177a.478.478 0 0 1-.344.156.478.478 0 0 1-.344-.156c-.25-.23-.25-.47 0-.72L7.344.297a1.09 1.09 0 0 1 .703-.296c.26-.01.495.088.703.297l3.188 3.16Z";
const ltr = false;
const accData = ICON_UPLOAD;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, accData, collection, packageName });

export default "SAP-icons-v4/upload";
export { pathData, ltr, viewBox, accData };