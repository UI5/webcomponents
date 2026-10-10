import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_DOWNLOAD } from "../generated/i18n/i18n-defaults.js";

const name = "download";
const pathData = "M15 14c.27 0 .505.099.703.297A.961.961 0 0 1 16 15a.947.947 0 0 1-.297.719A.988.988 0 0 1 15 16H1a.973.973 0 0 1-.719-.281A.974.974 0 0 1 0 15c0-.27.094-.505.281-.703A.947.947 0 0 1 1 14h14Zm-6.25-2.313c-.208.209-.443.308-.703.297a1.092 1.092 0 0 1-.703-.296L4.156 8.53c-.25-.25-.25-.49 0-.719.23-.229.459-.229.688 0L7.5 10.47V.5c0-.333.167-.5.5-.5.333 0 .5.167.5.5v10.031l2.719-2.719c.229-.229.469-.229.719 0 .25.25.25.49 0 .72L8.75 11.686Z";
const ltr = false;
const accData = ICON_DOWNLOAD;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, accData, collection, packageName });

export default "SAP-icons-v4/download";
export { pathData, ltr, viewBox, accData };