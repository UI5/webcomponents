import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_MOVE } from "../generated/i18n/i18n-defaults.js";

const name = "move";
const pathData = "M8 0a.75.75 0 0 1 .558.248l2.25 2.5a.75.75 0 0 1-1.116 1.004L8.75 2.704V7.25h4.545l-1.047-.942a.75.75 0 0 1 1.004-1.116l2.5 2.25a.75.75 0 0 1 0 1.116l-2.5 2.25a.75.75 0 0 1-1.004-1.116l1.047-.942H8.75v4.545l.942-1.047a.75.75 0 0 1 1.116 1.004l-2.25 2.5a.75.75 0 0 1-1.116 0l-2.25-2.5a.75.75 0 0 1 1.116-1.004l.942 1.047V8.75H2.705l1.047.942a.75.75 0 0 1-1.004 1.116l-2.5-2.25a.75.75 0 0 1 0-1.116l2.5-2.25a.75.75 0 0 1 1.004 1.116l-1.047.942H7.25V2.704l-.942 1.048a.75.75 0 0 1-1.116-1.004l2.25-2.5A.75.75 0 0 1 8 0Z";
const ltr = false;
const accData = ICON_MOVE;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, accData, collection, packageName });

export default "SAP-icons-v5/move";
export { pathData, ltr, viewBox, accData };