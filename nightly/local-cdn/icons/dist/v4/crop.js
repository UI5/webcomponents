import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_CROP } from "../generated/i18n/i18n-defaults.js";

const name = "crop";
const pathData = "M75.5 402V73h327V0h35v73h74v36h-74v329h-327v74h-35v-74h-74v-36h74zm35 0h292V109h-292v293zm129-219l48 96 25-41 55 91h-55l18 37h-183zm100-37q12 0 20 8t8 20q0 11-8 19t-20 8q-11 0-19-8t-8-19q0-12 8-20t19-8z";
const ltr = false;
const accData = ICON_CROP;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, accData, collection, packageName });

export default "SAP-icons-v4/crop";
export { pathData, ltr, accData };