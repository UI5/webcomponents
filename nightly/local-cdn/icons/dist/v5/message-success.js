import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_MESSAGE_SUCCESS } from "../generated/i18n/i18n-defaults.js";

const name = "message-success";
const pathData = "M256 512q-53 0-99.5-20T75 437t-55-81.5T0 256t20-99.5T75 75t81.5-55T256 0t99.5 20T437 75t55 81.5 20 99.5-20 99.5-55 81.5-81.5 55-99.5 20zm0-461q-42 0-79.5 16T111 111t-44 65.5T51 256t16 79.5 44 65.5 65.5 44 79.5 16 79.5-16 65.5-44 44-65.5 16-79.5-16-79.5-44-65.5-65.5-44T256 51zm-43 301q-10 0-17-7l-71-63q-9-8-9-19t7.5-18.5T142 237q10 0 17 7l53 47 128-131q8-8 18-8 11 0 18.5 7.5T384 178q0 10-7 17L231 344q-8 8-18 8z";
const ltr = true;
const accData = ICON_MESSAGE_SUCCESS;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, accData, collection, packageName });

export default "SAP-icons-v5/message-success";
export { pathData, ltr, accData };