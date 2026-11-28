import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_LAPTOP } from "../generated/i18n/i18n-defaults.js";

const name = "laptop";
const pathData = "M13.25 2c.966 0 1.75.784 1.75 1.75V12a1 1 0 1 1 0 2H1a1 1 0 1 1 0-2V3.75C1 2.784 1.784 2 2.75 2h10.5ZM2.75 3.5a.25.25 0 0 0-.25.25V12h11V3.75a.25.25 0 0 0-.25-.25H2.75Z";
const ltr = false;
const accData = ICON_LAPTOP;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, accData, collection, packageName });

export default "SAP-icons-v5/laptop";
export { pathData, ltr, viewBox, accData };