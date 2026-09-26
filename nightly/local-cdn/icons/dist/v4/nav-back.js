import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_NAV_BACK } from "../generated/i18n/i18n-defaults.js";

const name = "nav-back";
const pathData = "M11.723 13.285a.957.957 0 0 1 .277.702c0 .28-.092.514-.277.701a.967.967 0 0 1-.708.312.967.967 0 0 1-.707-.312L4.246 8.67a.723.723 0 0 0-.092-.156.362.362 0 0 0-.046-.077.362.362 0 0 1-.046-.078A1.106 1.106 0 0 1 4 8.016a.22.22 0 0 1 .015-.094.14.14 0 0 0 .016-.062.44.44 0 0 1 .092-.297c.02-.03.041-.067.062-.109.02-.02.03-.036.03-.046 0-.01.01-.026.031-.047.02-.021.03-.042.03-.063l6.032-5.986A.967.967 0 0 1 11.015 1c.267 0 .503.104.708.312.185.187.277.42.277.701a.957.957 0 0 1-.277.702l-4.77 4.802a.889.889 0 0 0 0 .997l4.77 4.771Z";
const ltr = false;
const accData = ICON_NAV_BACK;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, accData, collection, packageName });

export default "SAP-icons-v4/nav-back";
export { pathData, ltr, viewBox, accData };