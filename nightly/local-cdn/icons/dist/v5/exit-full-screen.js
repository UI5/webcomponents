import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_EXIT_FULL_SCREEN } from "../generated/i18n/i18n-defaults.js";

const name = "exit-full-screen";
const pathData = "M486 0q11 0 18.5 7.5T512 26t-7 18l-98 97h47q11 0 18.5 7t7.5 18-7.5 18.5T454 192H346q-11 0-18.5-7.5T320 166V58q0-11 7.5-18.5T346 32t18 7.5 7 18.5v47l97-98q7-7 18-7zM230 32q11 0 18.5 7.5T256 58t-7.5 18-18.5 7H90q-7 0-7 7v140q0 11-7 18.5T58 256t-18.5-7.5T32 230V90q0-24 17-41t41-17h140zm224 224q11 0 18.5 7.5T480 282v140q0 24-17 41t-41 17H282q-11 0-18.5-7.5T256 454t7.5-18 18.5-7h140q7 0 7-7V282q0-11 7-18.5t18-7.5zm-288 64q11 0 18.5 7.5T192 346v108q0 11-7.5 18.5T166 480t-18-7.5-7-18.5v-47l-97 98q-7 7-18 7t-18.5-7.5T0 486q0-10 8-18l97-97H58q-11 0-18.5-7T32 346t7.5-18.5T58 320h108z";
const ltr = false;
const accData = ICON_EXIT_FULL_SCREEN;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, accData, collection, packageName });

export default "SAP-icons-v5/exit-full-screen";
export { pathData, ltr, accData };