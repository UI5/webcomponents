import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_IPHONE } from "../generated/i18n/i18n-defaults.js";

const name = "iphone-2";
const pathData = "M0 346V166q0-29 22.5-49.5T77 96h358q32 0 54.5 20.5T512 166v180q0 29-22.5 49.5T435 416H77q-32 0-54.5-20.5T0 346zm461-180q0-8-7.5-13.5T435 147H77q-11 0-18.5 5.5T51 166v180q0 8 7.5 13.5T77 365h358q11 0 18.5-5.5T461 346V166z";
const ltr = false;
const accData = ICON_IPHONE;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, accData, collection, packageName });

export default "SAP-icons-v5/iphone-2";
export { pathData, ltr, accData };