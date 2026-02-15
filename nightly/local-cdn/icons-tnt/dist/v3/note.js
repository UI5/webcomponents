import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "note";
const pathData = "M485 511H27q-11 0-19-7.5T0 485V26Q0 15 8 7.5T27 0h458q11 0 19 7.5t8 18.5v459q0 11-8 18.5t-19 7.5zM53 458h406V53H53v405zm309-281h-80v224q0 11-7.5 19t-18.5 8-19-8-8-19V177h-79q-11 0-18.5-8t-7.5-19 7.5-19 18.5-8h212q11 0 18.5 8t7.5 19-7.5 19-18.5 8z";
const ltr = false;
const accData = null;
const collection = "tnt-v3";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v3/note";
export { pathData, ltr, accData };