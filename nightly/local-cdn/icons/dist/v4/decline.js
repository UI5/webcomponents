import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_DECLINE } from "../generated/i18n/i18n-defaults.js";

const name = "decline";
const pathData = "m2.205 2.96.752-.789A.559.559 0 0 1 3.367 2c.137 0 .263.057.377.171l4.239 4.286 4.273-4.286A.522.522 0 0 1 12.633 2a.56.56 0 0 1 .41.171l.752.789c.273.251.273.514 0 .789L9.555 8l4.24 4.286c.25.251.25.503 0 .754l-.752.789c-.183.114-.32.171-.41.171-.069 0-.194-.057-.377-.171L7.983 9.543l-4.24 4.286a.522.522 0 0 1-.375.171c-.092 0-.228-.057-.41-.171l-.753-.789c-.25-.251-.25-.503 0-.754L6.445 8l-4.24-4.251c-.273-.275-.273-.538 0-.789Z";
const ltr = false;
const accData = ICON_DECLINE;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, accData, collection, packageName });

export default "SAP-icons-v4/decline";
export { pathData, ltr, viewBox, accData };