import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_ADD } from "../generated/i18n/i18n-defaults.js";

const name = "add";
const pathData = "M0 7.429c0-.167.06-.304.179-.411a.575.575 0 0 1 .392-.16h6.286V.57c0-.166.06-.303.179-.41A.575.575 0 0 1 7.429 0H8.57c.381 0 .572.19.572.571v6.286h6.286c.38 0 .571.19.571.572V8.57c0 .381-.19.572-.571.572H9.143v6.286c0 .38-.19.571-.572.571H7.43a.575.575 0 0 1-.393-.16.528.528 0 0 1-.179-.411V9.143H.571a.575.575 0 0 1-.392-.16A.528.528 0 0 1 0 8.57V7.43Z";
const ltr = false;
const accData = ICON_ADD;
const viewBox = "0 0 16 16";
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, viewBox, accData, collection, packageName });

export default "SAP-icons-v4/add";
export { pathData, ltr, viewBox, accData };