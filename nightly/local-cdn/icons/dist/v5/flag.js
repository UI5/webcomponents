import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_FLAG } from "../generated/i18n/i18n-defaults.js";

const name = "flag";
const pathData = "M2.75 0a.75.75 0 0 1 .75.75v.564a4.565 4.565 0 0 1 4.191.454c.156.103.328.189.49.284 1.578 1.009 3.183.85 4.768.037a.672.672 0 0 1 .692.026.75.75 0 0 1 .359.64v7.47a.75.75 0 0 1-.37.646v.001c-1.998 1.192-4.256 1.65-6.275.276l-.45-.3c-.993-.67-2.287-.565-3.405.168v4.234a.75.75 0 0 1-1.5 0V.75A.75.75 0 0 1 2.75 0Z";
const ltr = true;
const accData = ICON_FLAG;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, accData, collection, packageName });

export default "SAP-icons-v5/flag";
export { pathData, ltr, viewBox, accData };