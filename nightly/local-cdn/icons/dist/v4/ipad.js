import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_IPAD } from "../generated/i18n/i18n-defaults.js";

const name = "ipad";
const pathData = "M13 0c.292 0 .531.099.719.297A.988.988 0 0 1 14 1v14a.974.974 0 0 1-.281.719A.974.974 0 0 1 13 16H3a.973.973 0 0 1-.719-.281A.974.974 0 0 1 2 15V1c0-.27.094-.505.281-.703A.947.947 0 0 1 3 0h10ZM8 15a.752.752 0 0 0 .531-.203.71.71 0 0 0 .219-.547.723.723 0 0 0-.219-.531A.723.723 0 0 0 8 13.5a.723.723 0 0 0-.531.219.723.723 0 0 0-.219.531c0 .23.073.412.219.547A.752.752 0 0 0 8 15Zm5-13H3v11h10V2Z";
const ltr = false;
const accData = ICON_IPAD;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, accData, collection, packageName });

export default "SAP-icons-v4/ipad";
export { pathData, ltr, viewBox, accData };