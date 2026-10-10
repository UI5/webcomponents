import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_UP } from "../generated/i18n/i18n-defaults.js";

const name = "up";
const pathData = "M1.752 15.003c-1.357 0-2.197-1.478-1.504-2.644L6.492 1.856A1.75 1.75 0 0 1 9.5 1.855l6.25 10.504c.693 1.166-.147 2.644-1.505 2.644H1.752Zm12.494-1.5a.25.25 0 0 0 .214-.377L8.211 2.622a.25.25 0 0 0-.43 0L1.538 13.126a.25.25 0 0 0 .214.377h12.494Z";
const ltr = false;
const accData = ICON_UP;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, accData, collection, packageName });

export default "SAP-icons-v5/up";
export { pathData, ltr, viewBox, accData };